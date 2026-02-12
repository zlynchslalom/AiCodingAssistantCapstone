const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const { Chess } = require('chess.js');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('move', (fen) => {
    const game = new Chess(fen);
    const moves = game.moves();
    if (moves.length > 0) {
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      socket.emit('ai-move', randomMove);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});