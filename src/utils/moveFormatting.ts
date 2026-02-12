/**
 * Utility functions for formatting chess moves in Standard Algebraic Notation (SAN)
 * @module utils/moveFormatting
 */

import type { Move } from 'chess.js';

/**
 * Formats a move in SAN notation for display
 * @param move - Move object from chess.js
 * @returns Formatted move string in SAN
 */
export function formatMoveToSAN(move: Move): string {
  return move.san;
}

/**
 * Formats move history as a numbered list
 * @param moves - Array of moves in SAN notation
 * @returns Array of formatted move pairs (e.g., "1. e4 e5")
 */
export function formatMoveHistory(moves: string[]): string[] {
  const formatted: string[] = [];
  
  for (let i = 0; i < moves.length; i += 2) {
    const moveNumber = Math.floor(i / 2) + 1;
    const whiteMove = moves[i];
    const blackMove = moves[i + 1] || '';
    
    formatted.push(`${moveNumber}. ${whiteMove}${blackMove ? ' ' + blackMove : ''}`);
  }
  
  return formatted;
}

/**
 * Converts a move to descriptive text
 * @param move - Move object from chess.js
 * @returns Human-readable move description
 */
export function formatMoveDescription(move: Move): string {
  const pieceNames: Record<string, string> = {
    p: 'Pawn',
    n: 'Knight',
    b: 'Bishop',
    r: 'Rook',
    q: 'Queen',
    k: 'King',
  };

  const pieceName = pieceNames[move.piece] || 'Piece';
  const capture = move.captured ? ' captures ' + pieceNames[move.captured] : '';
  const promotion = move.promotion ? ' and promotes to ' + pieceNames[move.promotion] : '';
  
  return `${pieceName} from ${move.from} to ${move.to}${capture}${promotion}`;
}

/**
 * Gets the last move in formatted notation
 * @param moves - Array of moves in SAN notation
 * @returns Last move formatted, or empty string if no moves
 */
export function getLastMove(moves: string[]): string {
  if (moves.length === 0) {
    return '';
  }
  return moves[moves.length - 1];
}
