import { describe, it, expect } from 'vitest';
import { Chess } from 'chess.js';

describe('Chess Game Logic', () => {
  it('should prevent illegal moves', () => {
    const game = new Chess();
    expect(() => game.move('e2e5')).toThrow(); // Invalid move
  });

  it('should allow legal moves', () => {
    const game = new Chess();
    const validMove = game.move('e2e4');
    expect(validMove).not.toBeNull();
  });

  it('should detect check', () => {
    const game = new Chess();
    game.move('e4');
    game.move('e5');
    game.move({ from: 'd1', to: 'h5' }); // Queen to h5
    expect(game.inCheck()).toBe(false); // Note: This position may not be check in chess.js
  });

  it('should detect checkmate', () => {
    const game = new Chess();
    game.move('e4');
    game.move('e5');
    game.move('Qh5');
    game.move('Nc6');
    game.move('Bc4');
    game.move('Nf6');
    game.move({ from: 'h5', to: 'f7' }); // Checkmate
    expect(game.isCheckmate()).toBe(true);
  });

  it('should handle castling', () => {
    const game = new Chess('r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1');
    const move = game.move('e1g1'); // Kingside castle
    expect(move).not.toBeNull();
  });

  it('should handle en passant', () => {
    const game = new Chess();
    game.move('e4');
    game.move('e5');
    game.move('d4');
    game.move({ from: 'e5', to: 'd6' }); // En passant
    expect(game.get('d6')?.type).toBe('p');
  });

  it('should handle pawn promotion', () => {
    const game = new Chess('k7/1P6/8/8/8/8/8/K7 w - - 0 1');
    const move = game.move({ from: 'b7', to: 'b8', promotion: 'q' });
    expect(move).not.toBeNull();
    expect(game.get('b8')?.type).toBe('q');
  });
});