# Project Overview

## Introduction

This project is a full-stack chess web application that allows users to play chess against an AI opponent. The application provides a clean, responsive chess experience with full rule validation, move highlighting, and an integrated Stockfish chess engine for computer play. Built as part of the AI Coding Assistant Capstone project, it demonstrates modern web development practices with React and TypeScript.

## Architecture

The project follows a monorepo architecture with integrated frontend and backend components:

- `src/`: React-based web application (frontend)
- `server/`: Node.js backend utilities (minimal, primarily for future extensions)
- `docs/`: Project documentation and requirements
- `public/`: Static assets

## Technology Stack

### Frontend
- **React 19.2.0**: UI framework with modern hooks
- **TypeScript 5.9.3**: Type-safe JavaScript
- **Vite 8.x**: Fast build tool and dev server
- **chess.js 1.4.0**: Chess game logic and move validation
- **react-chessboard 5.10.0**: Interactive chessboard component
- **Stockfish.js 10.0.2**: AI chess engine
- **Vitest 4.x**: Unit testing framework
- **React Testing Library**: Component testing

### Backend (Minimal)
- **Node.js**: JavaScript runtime
- **Express.js 5.2.1**: Web server (for static assets and future API)
- **chess.js 1.4.0**: Server-side chess logic utilities

### Development Tools
- **ESLint**: Code quality and linting
- **TypeScript ESLint**: TypeScript-specific linting rules
- **Vite**: Hot module replacement for fast development

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/zlynchslalom/AiCodingAssistantCapstone.git
   cd AiCodingAssistantCapstone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Development Workflow

### Running the Application
- **Development mode**: `npm run dev` - Starts Vite dev server with hot reload
- **Build for production**: `npm run build` - Compiles TypeScript and builds optimized bundle
- **Preview production build**: `npm run preview` - Serves the production build locally

### Testing
- **Run all tests**: `npm test` - Executes all unit tests with Vitest
- **Run tests in watch mode**: `npm test -- --watch` - Continuous testing during development
- **Test coverage**: `npm test -- --coverage` - Generates coverage report

### Code Quality
- **Lint code**: `npm run lint` - Checks code quality with ESLint
- **Type checking**: `npm run build` includes TypeScript compilation

### Project Structure
```
/
├── src/                    # Frontend source code
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   ├── chessLogic.test.ts # Chess logic unit tests
│   └── assets/            # Static assets (images, etc.)
├── server/                 # Backend utilities
│   ├── index.js           # Server entry point (future use)
│   └── package.json       # Backend dependencies
├── docs/                   # Project documentation
│   ├── functional-requirements.md
│   ├── prd-todo.md
│   ├── coding-guidelines.md
│   └── ui-guidelines.md
├── public/                 # Public static files
├── package.json           # Root package configuration
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── eslint.config.js       # ESLint configuration
```

## Key Features

### Implemented ✓
- Interactive chess board with drag-and-drop or click-to-move
- Full chess rule validation (standard moves, castling, check/checkmate)
- Legal move highlighting
- AI opponent powered by Stockfish engine
- Move history display
- Game state detection (check, checkmate, stalemate)
- Visual feedback for piece selection and last move

### In Progress / Planned
- En passant capture implementation
- Pawn promotion modal with piece selection
- Draw detection (insufficient material, threefold repetition, fifty-move rule)
- Adjustable AI difficulty levels
- Undo/redo functionality
- Game save/load capability
- PGN export

## Development Guidelines

### Code Style
- Follow TypeScript strict mode conventions
- Use functional React components with hooks
- Maintain separation between UI logic and game logic
- Write descriptive variable and function names
- Add JSDoc comments for complex functions

### Testing Practices
- Write unit tests for all chess logic functions
- Test edge cases (check, checkmate, special moves)
- Maintain test coverage above 80% for critical logic
- Use React Testing Library for component tests

### Git Workflow
- Create feature branches from `main`
- Use descriptive commit messages
- Commits follow format: `<type>: <description>`
  - Example: `feat: add pawn promotion modal`
  - Example: `fix: resolve castling validation bug`
- Test before committing
- Keep commits focused and atomic

## Deployment

The application can be deployed to any static hosting service:

### Build Steps
1. Run `npm run build` to create optimized production bundle
2. Output is generated in `dist/` directory
3. Deploy `dist/` contents to hosting service

### Recommended Hosting Options
- **Vercel**: Zero-config deployment for Vite apps
- **Netlify**: Simple drag-and-drop deployment
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3 + CloudFront**: Scalable cloud hosting

### Environment Configuration
- No environment variables required for basic deployment
- Future API integrations may require environment configuration

## Resources

- [Project Requirements (PRD)](./docs/prd-todo.md)
- [Functional Requirements](./docs/functional-requirements.md)
- [Coding Guidelines](./docs/coding-guidelines.md)
- [UI Guidelines](./docs/ui-guidelines.md)
- [chess.js Documentation](https://github.com/jhlywa/chess.js)
- [React Chessboard](https://github.com/Clariity/react-chessboard)
- [Stockfish Engine](https://github.com/nmrugg/stockfish.js)

## Contributing

This is a capstone project for demonstrating AI-assisted development. For questions or issues, please contact the project maintainer or open an issue on GitHub.

---

**Last Updated**: February 12, 2026
