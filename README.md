# Chess Web App

An interactive chess game built with React, TypeScript, and Vite. Features piece movement validation, visual feedback, and a clean Seahawks-themed UI.

## Features

### ✅ Implemented (Feature 001: Piece Movement)

- **Legal Move Validation**: All moves validated against FIDE chess rules using chess.js
- **Click-to-Move**: Select pieces by clicking, see legal moves highlighted, click destination to move
- **Drag-and-Drop**: Drag pieces directly to their destination squares
- **Visual Feedback**:
  - Selected pieces highlighted with green border
  - Legal move destinations shown with translucent green circles
  - King highlighted in red when in check
  - Check/Checkmate/Stalemate status displayed
- **Turn Management**: Turn indicator shows whose move it is, enforces turn-based play

## Tech Stack

- **Frontend**: React 19.2.0, TypeScript 5.9.3 (strict mode)
- **Chess Logic**: chess.js 1.4.0 (FIDE-compliant rules engine)
- **Chess UI**: react-chessboard 5.10.0
- **Build Tool**: Vite 8.x
- **Testing**: Vitest 4.x, React Testing Library
- **Linting**: ESLint 9.x with TypeScript support

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint

# Build for production
npm run build
```

### Development

The app will start on `http://localhost:5173` (default Vite port).

## Project Structure

```
src/
├── App.tsx                 # Main chess game component
├── App.css                 # Component styles (Seahawks theme)
├── App.test.tsx            # Component integration tests
├── chessLogic.test.ts      # Unit tests for chess rules (52 tests)
├── types/
│   └── chess.ts            # TypeScript type definitions
└── utils/
    ├── chessLogic.ts       # Chess move validation functions
    ├── chessValidation.ts  # FEN validation utilities
    ├── boardStyles.ts      # Square styling (Seahawks colors)
    └── moveFormatting.ts   # SAN notation formatting
```

## Testing

- **Unit Tests**: 52 tests for chess move validation (92%+ coverage)
  - Pawn, Knight, Bishop, Rook, Queen, King movements
  - Castling, en passant, pawn promotion
  - Pinned pieces, check detection, illegal moves
- **Component Tests**: 21 tests for React components
  - Click-to-move interaction
  - Drag-and-drop functionality
  - Turn management
  - Game state display

**Total**: 73 tests passing

## Code Quality

- **TypeScript Strict Mode**: Enabled for type safety
- **ESLint**: Configured with React and TypeScript rules
- **Test Coverage**: 51.76% overall, 92.3% for critical chess logic
- **Performance**: <100ms interaction response, <50ms move validation

## UI Theme

Seahawks color scheme:
- **Navy**: `#002244` (background)
- **Green**: `#69BE28` (accents, buttons, highlights)
- **Grey**: `#A5ACAF` (hover states)

## Future Enhancements

- Move history panel with SAN notation
- Captured pieces display
- Undo/redo moves
- Pawn promotion dialog
- AI opponent integration
- Multiplayer support via WebSockets
- Game save/load functionality
- Opening book and position analysis

## License

This project is part of an AI Coding Assistant Capstone demonstration.

---

## React + Vite Configuration

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
