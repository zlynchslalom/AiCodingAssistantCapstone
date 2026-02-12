/**
 * Utility functions for board square styling with Seahawks color scheme
 * @module utils/boardStyles
 */

import type { SquareStyles } from '../types/chess';

/**
 * Seahawks team colors
 */
export const SEAHAWKS_COLORS = {
  navy: '#002244',
  green: '#69BE28',
  lightGreen: 'rgba(105, 190, 40, 0.4)',
  grey: '#A5ACAF',
};

/**
 * Creates style for selected piece (bright green border)
 * @param square - Square to highlight
 * @returns Style object for selected square
 */
export function getSelectedSquareStyle(square: string): SquareStyles {
  return {
    [square]: {
      background: SEAHAWKS_COLORS.lightGreen,
      border: `3px solid ${SEAHAWKS_COLORS.green}`,
      boxShadow: `0 0 10px ${SEAHAWKS_COLORS.green}`,
    },
  };
}

/**
 * Creates styles for legal move indicators (dots/circles)
 * @param squares - Array of legal move destination squares
 * @returns Style object for legal move squares
 */
export function getLegalMoveStyles(squares: string[]): SquareStyles {
  const styles: SquareStyles = {};
  squares.forEach(square => {
    styles[square] = {
      background: SEAHAWKS_COLORS.lightGreen,
      borderRadius: '50%',
    };
  });
  return styles;
}

/**
 * Creates style for a square in check (king under attack)
 * @param square - Square containing king in check
 * @returns Style object for check square
 */
export function getCheckSquareStyle(square: string): SquareStyles {
  return {
    [square]: {
      background: 'rgba(255, 0, 0, 0.5)',
      boxShadow: '0 0 15px rgba(255, 0, 0, 0.7)',
    },
  };
}

/**
 * Creates styles for last move highlighting (source and destination)
 * @param from - Source square of last move
 * @param to - Destination square of last move
 * @returns Style object for both squares
 */
export function getLastMoveStyles(from: string, to: string): SquareStyles {
  return {
    [from]: {
      background: 'rgba(255, 255, 0, 0.3)',
    },
    [to]: {
      background: 'rgba(255, 255, 0, 0.4)',
    },
  };
}

/**
 * Merges multiple square style objects
 * @param styleObjects - Array of style objects to merge
 * @returns Merged style object
 */
export function mergeSquareStyles(...styleObjects: SquareStyles[]): SquareStyles {
  return Object.assign({}, ...styleObjects);
}
