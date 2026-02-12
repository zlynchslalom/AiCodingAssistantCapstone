import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3000');

function App() {
  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  useEffect(() => {
    socket.on('ai-move', (move) => {
      console.log('AI move received:', move);
      const newGame = new Chess(game.fen());
      newGame.move(move);
      setGame(newGame);
    });

    return () => {
      socket.off('ai-move');
    };
  }, [game]);

  function makeAMove(move) {
    console.log('Attempting move:', move);
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    console.log('Move result:', result);
    if (result) {
      setGame(gameCopy);
      socket.emit('move', gameCopy.fen());
      console.log('Game updated, FEN:', gameCopy.fen());
    }
    return result;
  }

  function onSquareClick(square) {
    console.log('Square clicked:', square);
    setRightClickedSquares({});

    if (!game) return;

    const piece = game.get(square);
    console.log('Piece on square:', piece);
    if (piece && piece.color === game.turn()) {
      console.log('Selecting piece');
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true });
      console.log('Possible moves:', moves);
      const newSquares = {};
      moves.forEach((move) => {
        newSquares[move.to] = {
          background: 'rgba(0, 255, 0, 0.4)',
        };
      });
      setOptionSquares(newSquares);
    } else if (selectedSquare) {
      console.log('Attempting move from', selectedSquare, 'to', square);
      const move = makeAMove({
        from: selectedSquare,
        to: square,
        promotion: 'q',
      });
      if (move) {
        setSelectedSquare(null);
        setOptionSquares({});
      }
    }
  }

  function onPieceDrop(sourceSquare, targetSquare) {
    console.log('Piece dropped from', sourceSquare, 'to', targetSquare);
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
    if (move) {
      setSelectedSquare(null);
      setOptionSquares({});
    }
    return move !== null;
  }

  return (
    <div className="app">
      <h1>Chess Web App</h1>
      <div className="board-container">
        <Chessboard
          position={game.fen()}
          onSquareClick={onSquareClick}
          onPieceDrop={onPieceDrop}
          boardOrientation={boardOrientation}
          boardWidth={400}
          customSquareStyles={{
            ...optionSquares,
            ...rightClickedSquares,
          }}
          isDraggablePiece={({ piece }) => piece[0] === game.turn()}
        />
      </div>
      <div className="controls">
        <button onClick={() => { setGame(new Chess()); setSelectedSquare(null); setOptionSquares({}); }}>New Game</button>
        <button onClick={() => setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white')}>
          Flip Board
        </button>
      </div>
      <p>Turn: {game.turn() === 'w' ? 'White' : 'Black'}</p>
      {game.isCheckmate() && <p>Checkmate!</p>}
      {game.isStalemate() && <p>Stalemate!</p>}
    </div>
  );
}

export default App;
