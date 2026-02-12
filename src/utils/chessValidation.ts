/**
 * Utility functions for chess game validation
 * @module utils/chessValidation
 */

import { Chess } from 'chess.js';

/**
 * Validates a FEN (Forsyth-Edwards Notation) string format
 * @param fen - FEN string to validate
 * @returns true if valid FEN format, false otherwise
 * @remarks
 * FEN notation describes a chess position. A valid FEN must include:
 * - Piece placement (8 ranks)
 * - Active color (w or b)
 * - Castling availability (KQkq or -)
 * - En passant target square
 * - Halfmove clock
 * - Fullmove number
 * @example
 * ```ts
 * isValidFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'); // true
 * isValidFEN('invalid'); // false
 * ```
 */
export function isValidFEN(fen: string): boolean {
  if (!fen || typeof fen !== 'string') {
    return false;
  }

  try {
    const testGame = new Chess(fen);
    // If Chess constructor doesn't throw, FEN is valid
    return testGame.fen() === fen || testGame.fen().split(' ').slice(0, 4).join(' ') === fen.split(' ').slice(0, 4).join(' ');
  } catch {
    return false;
  }
}

/**
 * Gets all legal moves for a specific square
 * @param game - Chess instance
 * @param square - Square to get moves for (e.g., 'e2')
 * @returns Array of legal move destinations as square strings
 * @example
 * ```ts
 * const moves = getLegalMovesForSquare(game, 'e2');
 * // Returns: ['e3', 'e4']
 * ```
 */
export function getLegalMovesForSquare(game: Chess, square: string): string[] {
  const moves = game.moves({ square, verbose: true });
  return moves.map(move => move.to);
}

/**
 * Checks if a move is legal
 * @param game - Chess instance
 * @param from - Source square (e.g., 'e2')
 * @param to - Destination square (e.g., 'e4')
 * @param promotion - Optional promotion piece ('q', 'r', 'b', 'n')
 * @returns true if move is legal according to FIDE rules
 * @example
 * ```ts
 * if (isMoveLegal(game, 'e2', 'e4')) {
 *   console.log('Valid opening move');
 * }
 * ```
 */
export function isMoveLegal(game: Chess, from: string, to: string, promotion?: string): boolean {
  const moves = game.moves({ verbose: true });
  return moves.some(move => 
    move.from === from && 
    move.to === to && 
    (promotion ? move.promotion === promotion : true)
  );
}
