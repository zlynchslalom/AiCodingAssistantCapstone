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

  useEffect(() => {
    socket.on('ai-move', (move) => {
      const newGame = new Chess(game.fen());
      newGame.move(move);
      setGame(newGame);
    });

    return () => {
      socket.off('ai-move');
    };
  }, [game]);

  function makeAMove(move) {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    if (result) {
      setGame(gameCopy);
      socket.emit('move', gameCopy.fen());
    }
    return result;
  }

  function onSquareClick(square) {
    setRightClickedSquares({});

    if (!game) return;

    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      const moves = game.moves({ square, verbose: true });
      const newSquares = {};
      moves.forEach((move) => {
        newSquares[move.to] = {
          background: 'rgba(0, 255, 0, 0.4)',
        };
      });
      setOptionSquares(newSquares);
    } else {
      const move = makeAMove({
        from: Object.keys(optionSquares)[0],
        to: square,
        promotion: 'q',
      });
      if (move) {
        setOptionSquares({});
      }
    }
  }

  function onPieceDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });
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
          customSquareStyles={{
            ...optionSquares,
            ...rightClickedSquares,
          }}
          isDraggablePiece={({ piece }) => piece[0] === game.turn()}
        />
      </div>
      <div className="controls">
        <button onClick={() => setGame(new Chess())}>New Game</button>
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
