/**
 * TypeScript type definitions for chess game state and pieces
 * @module types/chess
 */

import type { Square, PieceSymbol, Color, Move } from 'chess.js';

/**
 * Represents a chess piece on the board
 */
export interface ChessPiece {
  type: PieceSymbol;
  color: Color;
}

/**
 * Re-export chess.js Square type for convenience
 */
export type ChessSquare = Square;

/**
 * Represents a chess move with source and destination
 */
export interface ChessMove {
  from: Square;
  to: Square;
  promotion?: PieceSymbol;
}

/**
 * Extended move information from chess.js
 */
export type VerboseMove = Move;

/**
 * Represents the complete game state
 */
export interface GameState {
  fen: string;
  turn: Color;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  isGameOver: boolean;
  moveHistory: string[];
}

/**
 * Square styling options for visual feedback
 */
export interface SquareStyles {
  [square: string]: {
    background?: string;
    borderRadius?: string;
    boxShadow?: string;
    border?: string;
  };
}

/**
 * Move validation result
 */
export interface MoveValidation {
  isValid: boolean;
  move: Move | null;
  error?: string;
}

/**
 * Player color type
 */
export type PlayerColor = 'w' | 'b';
