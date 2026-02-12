/**
 * Core chess game logic using chess.js library
 * @module utils/chessLogic
 */

import { Chess } from 'chess.js';
import type { Move, Square } from 'chess.js';
import type { ChessMove, MoveValidation } from '../types/chess';

/**
 * Gets all legal moves for the current position
 * @param game - Chess instance
 * @returns Array of legal moves in verbose format
 */
export function getMoves(game: Chess): Move[] {
  return game.moves({ verbose: true });
}

/**
 * Validates and executes a move
 * @param game - Chess instance
 * @param move - Move to validate and execute
 * @returns Move result or null if invalid
 */
export function validateMove(game: Chess, move: ChessMove): MoveValidation {
  try {
    const result = game.move(move);
    if (result) {
      return {
        isValid: true,
        move: result,
      };
    }
    return {
      isValid: false,
      move: null,
      error: 'Invalid move',
    };
  } catch (error) {
    return {
      isValid: false,
      move: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Gets all legal moves for a specific square
 * @param game - Chess instance
 * @param square - Square to check
 * @returns Array of legal destination squares
 */
export function getLegalMovesForSquare(game: Chess, square: Square): Square[] {
  const moves = game.moves({ square, verbose: true });
  return moves.map(move => move.to);
}

/**
 * Checks if moving from a square would be legal for current player
 * @param game - Chess instance
 * @param square - Square to check
 * @returns true if any legal moves exist from this square
 */
export function hasLegalMovesFromSquare(game: Chess, square: Square): boolean {
  const moves = game.moves({ square, verbose: true });
  return moves.length > 0;
}

/**
 * Gets the piece at a specific square
 * @param game - Chess instance
 * @param square - Square to check
 * @returns Piece object or null if empty
 */
export function getPieceAt(game: Chess, square: Square) {
  return game.get(square);
}

/**
 * Checks if current player is in check
 * @param game - Chess instance
 * @returns true if in check
 */
export function isInCheck(game: Chess): boolean {
  return game.inCheck();
}

/**
 * Gets the square of the king for the current turn
 * @param game - Chess instance
 * @returns Square containing the king
 */
export function getKingSquare(game: Chess): Square | null {
  const board = game.board();
  const currentTurn = game.turn();
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = board[row][col];
      if (square && square.type === 'k' && square.color === currentTurn) {
        // Convert row/col to square notation (e.g., e1)
        const file = String.fromCharCode(97 + col); // 'a' + col
        const rank = String(8 - row);
        return (file + rank) as Square;
      }
    }
  }
  
  return null;
}
