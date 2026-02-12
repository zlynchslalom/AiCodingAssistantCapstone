import { useState, useEffect, useMemo, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import type { Square } from 'chess.js';
// import { io } from 'socket.io-client';
import './App.css';
import { 
  validateMove, 
  getLegalMovesForSquare, 
  isInCheck, 
  getKingSquare 
} from './utils/chessLogic';
import { 
  getLegalMoveStyles, 
  getCheckSquareStyle, 
  getSelectedSquareStyle, 
  mergeSquareStyles 
} from './utils/boardStyles';

// const socket = io('http://localhost:3000');

function App() {
  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [optionSquares, setOptionSquares] = useState({});
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  useEffect(() => {
    // socket.on('ai-move', (move) => {
    //   console.log('AI move received:', move);
    //   const newGame = new Chess(game.fen());
    //   newGame.move(move);
    //   setGame(newGame);
    // });

    // return () => {
    //   socket.off('ai-move');
    // };
  }, [game]);

  // Calculate custom square styles with check highlighting
  const customSquareStyles = useMemo(() => {
    let styles = { ...optionSquares };
    
    // Add selected square highlighting
    if (selectedSquare) {
      styles = mergeSquareStyles(styles, getSelectedSquareStyle(selectedSquare));
    }
    
    // Add check highlighting
    if (isInCheck(game)) {
      const kingSquare = getKingSquare(game);
      if (kingSquare) {
        styles = mergeSquareStyles(styles, getCheckSquareStyle(kingSquare));
      }
    }
    
    return styles;
  }, [game, optionSquares, selectedSquare]);

  /**
   * Attempts to make a chess move
   * @param move - Move object with from, to, and optional promotion
   * @returns Move object if successful, null otherwise
   */
  const makeAMove = useCallback((move: { from: Square; to: Square; promotion?: string }) => {
    const gameCopy = new Chess(game.fen());
    const result = validateMove(gameCopy, move as { from: Square; to: Square; promotion?: 'q' | 'r' | 'b' | 'n' });
    
    if (result.isValid && result.move) {
      setGame(gameCopy);
      return result.move;
    }
    return null;
  }, [game]);

  /**
   * Handles square click events for piece selection and movement
   * @param args - Object containing piece and square information
   */
  const onSquareClick = useCallback(({ square }: { piece: any; square: string }) => {
    setOptionSquares({});

    const piece = game.get(square as Square);
    
    // If clicking on own piece, select it and show legal moves
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square as Square);
      const legalMoves = getLegalMovesForSquare(game, square as Square);
      setOptionSquares(getLegalMoveStyles(legalMoves));
    } 
    // If a piece is already selected, try to move it
    else if (selectedSquare) {
      const move = makeAMove({
        from: selectedSquare,
        to: square as Square,
        promotion: 'q',
      });
      
      if (move) {
        setSelectedSquare(null);
        setOptionSquares({});
      } else {
        // Click on empty square or invalid move - deselect
        setSelectedSquare(null);
        setOptionSquares({});
      }
    }
  }, [game, selectedSquare, makeAMove]);

  /**
   * Handles piece drop events for drag-and-drop movement
   * @param args - Object containing piece, sourceSquare, and targetSquare
   * @returns true if move was successful, false otherwise
   */
  const onPieceDrop = useCallback(({ sourceSquare, targetSquare }: { piece: any; sourceSquare: string; targetSquare: string | null }) => {
    if (!targetSquare) return false;
    
    const move = makeAMove({
      from: sourceSquare as Square,
      to: targetSquare as Square,
      promotion: 'q',
    });
    
    if (move) {
      setSelectedSquare(null);
      setOptionSquares({});
      return true;
    }
    
    return false;
  }, [makeAMove]);

  /**
   * Resets the game to initial position
   */
  const handleNewGame = useCallback(() => {
    setGame(new Chess());
    setSelectedSquare(null);
    setOptionSquares({});
  }, []);

  /**
   * Flips the board orientation
   */
  const handleFlipBoard = useCallback(() => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white');
  }, []);

  return (
    <div className="app">
      <h1>Chess Web App</h1>
      <div className="board-container">
        <Chessboard
          options={{
            position: game.fen(),
            onSquareClick: onSquareClick,
            onPieceDrop: onPieceDrop,
            boardOrientation: boardOrientation,
            squareStyles: customSquareStyles,
            boardStyle: {
              borderRadius: '4px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
            }
          }}
        />
      </div>
      <div className="controls">
        <button onClick={handleNewGame}>New Game</button>
        <button onClick={handleFlipBoard}>Flip Board</button>
      </div>
      <p>Turn: {game.turn() === 'w' ? 'White' : 'Black'}</p>
      {isInCheck(game) && !game.isCheckmate() && <p className="check-warning">Check!</p>}
      {game.isCheckmate() && <p className="game-over">Checkmate!</p>}
      {game.isStalemate() && <p className="game-over">Stalemate!</p>}
    </div>
  );
}

export default App;
