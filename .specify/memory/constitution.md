<!--
Sync Impact Report - Version 1.0.0
=====================================
Version Change: Initial → 1.0.0
Rationale: Initial constitution establishing core principles for Chess Web App project

Principles Defined:
- I. Code Quality First (SOLID, DRY, KISS principles)
- II. Test-Driven Development (80%+ coverage mandatory)
- III. Type Safety & Validation (TypeScript strict mode)
- IV. Performance Standards (interaction response times)
- V. Desktop-First UI Design (Seahawks-themed, accessibility future goal)
- VI. Chess Rules Compliance (standard FIDE rules)

Added Sections:
- Technical Stack Requirements
- Development Workflow
- Code Review Standards

Templates Requiring Updates:
✅ .specify/templates/plan-template.md - reviewed, aligned with principles
✅ .specify/templates/spec-template.md - reviewed, aligned with requirements
✅ .specify/templates/tasks-template.md - reviewed, task categorization compatible
✅ .specify/templates/commands/*.md - reviewed, no agent-specific references found

Follow-up TODOs:
- None at this time

Last Updated: 2026-02-12
-->

# Chess Web App Constitution

## Core Principles

### I. Code Quality First (NON-NEGOTIABLE)
All code MUST adhere to software engineering best practices:
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY (Don't Repeat Yourself)**: Extract common code into shared functions/utilities; no duplication across codebase
- **KISS (Keep It Simple)**: Prefer simple, straightforward implementations; avoid premature optimization; prioritize readability
- **Single Responsibility**: Each component/function MUST have one clear purpose and one reason to change
- **Separation of Concerns**: UI logic separated from game logic; clear boundaries between layers

**Rationale**: Maintainable, scalable codebase that multiple developers can work on without introducing technical debt. These principles prevent code rot and ensure long-term project health.

### II. Test-Driven Development (NON-NEGOTIABLE)
Comprehensive testing is mandatory for all features:
- **Coverage Target**: 80%+ code coverage across all packages (enforced via Vitest coverage reports)
- **Test Types**: Unit tests for components/functions, integration tests for component interactions
- **Testing Framework**: Vitest 4.x for unit tests, React Testing Library for component testing
- **Test Quality**: Test behavior not implementation; descriptive test names; independent tests with no shared state
- **Arrange-Act-Assert Pattern**: All tests MUST follow AAA structure for clarity

**Critical Coverage Areas**:
- Chess move validation logic (100% coverage required)
- Check/checkmate/stalemate detection
- Special moves (castling, en passant, pawn promotion)
- Game state management
- UI component interactions

**Rationale**: Testing ensures correctness of complex chess rules and prevents regressions. High coverage provides confidence in refactoring and feature additions.

### III. Type Safety & Validation
TypeScript strict mode is mandatory to catch errors at compile time:
- **TypeScript Strict Mode**: Enabled for all .ts/.tsx files; no `any` types except justified exceptions
- **Chess Logic Validation**: All moves MUST be validated against standard FIDE chess rules before execution
- **Input Validation**: Validate all user inputs and API boundaries; use guard clauses and default values
- **Prop Type Safety**: React components MUST define explicit prop interfaces; no implicit any types
- **JSDoc**: Public functions MUST include JSDoc comments with type information

**Rationale**: Type safety prevents runtime errors and improves IDE support. Chess rule validation ensures game integrity and prevents illegal game states.

### IV. Performance Standards
User experience MUST feel instant and responsive:
- **Interaction Response**: <100ms for all user interactions (piece selection, move highlighting)
- **Move Validation**: <50ms for legal move checking
- **AI Move Calculation**: <3 seconds maximum for opponent moves (varies by difficulty)
- **Initial Page Load**: <2 seconds from request to interactive board
- **Zero-Latency Feel**: Visual feedback (highlights, selection) MUST be immediate; no perceptible delay

**Optimization Requirements**:
- Use React hooks appropriately (useMemo, useCallback) to prevent unnecessary renders
- AI engine MUST run in Web Worker to prevent UI blocking
- Lazy load components where appropriate

**Rationale**: Chess is a real-time interactive game; users expect instant feedback. Sluggish UI breaks immersion and frustrates players.

### V. Desktop-First UI Design
Visual design follows clear guidelines for consistency:
- **Platform Priority**: Desktop layout and interactions prioritized; mobile support is post-MVP
- **Branding**: Seattle Seahawks color palette (Navy #002244, Green #69BE28, Silver #A5ACAF)
- **Component Standards**: All UI components MUST follow specifications in `docs/ui-guidelines.md`
  - Consistent spacing (xs: 8px, sm: 16px, md: 24px, lg: 32px)
  - Border radius: 8px for cards, 4px for inputs/buttons
  - Clear hover/focus/active/disabled states defined
- **Visual Feedback**: Selected pieces, legal moves, last move, check status MUST be clearly indicated
- **Interaction States**: Hover, focus, active, disabled, loading states explicitly defined for all interactive elements
- **Accessibility**: Future goal; current focus is visual clarity for desktop users

**Rationale**: Consistent UI creates professional appearance and predictable user experience. Design system prevents ad-hoc styling decisions.

### VI. Chess Rules Compliance (NON-NEGOTIABLE)
Game logic MUST implement standard FIDE chess rules completely and correctly:
- **Standard Piece Movement**: Pawns, Knights, Bishops, Rooks, Queens, Kings move per FIDE rules
- **Special Moves**: Castling (kingside/queenside), en passant, pawn promotion MUST be fully implemented
- **Game State Detection**: Check, checkmate, stalemate MUST be detected automatically and immediately
- **Draw Conditions**: Insufficient material, threefold repetition, fifty-move rule MUST be implemented
- **Move Legality**: MUST prevent all illegal moves including those leaving/putting own king in check
- **Move History**: MUST display in standard algebraic notation (SAN) format

**Implementation Requirements**:
- Use chess.js library (v1.4.0) for move validation and rule enforcement
- All chess logic MUST have unit test coverage validating rule compliance
- Game state MUST be validated after every move

**Rationale**: Chess has precise, well-defined rules. Incorrect implementation breaks game integrity and user trust.

### VII. Code Organization & Standards
Consistent code structure enables team collaboration:
- **Naming Conventions**:
  - camelCase for variables/functions: `getUserId`, `calculateMove`
  - PascalCase for components/classes: `ChessBoard`, `GameController`
  - UPPER_SNAKE_CASE for constants: `MAX_AI_DEPTH`, `DEFAULT_DIFFICULTY`
- **Import Organization**: External libraries → Internal modules → Styles (with blank line separations)
- **File Structure**: Imports → Constants → Utility functions → Main component/class → Helper functions → Exports
- **Line Length**: Keep lines under 100 characters for readability
- **Indentation**: 2 spaces (enforced by ESLint)
- **No Unused Code**: Remove unused variables, imports, commented code before commit

**Rationale**: Consistent code style reduces cognitive load and merge conflicts. Clear organization makes codebase navigable.

## Technical Stack Requirements

### Mandatory Technologies
- **Frontend Framework**: React 19.2.0 with TypeScript 5.9.3
- **Build Tool**: Vite 8.x for fast development and optimized builds
- **Chess Logic**: chess.js 1.4.0 for move validation and game rules
- **Board UI**: react-chessboard 5.10.0 for visual chess board component
- **AI Engine**: Stockfish.js 10.0.2 for computer opponent
- **Testing**: Vitest 4.x with React Testing Library
- **Linting**: ESLint with TypeScript ESLint plugin
- **State Management**: React hooks (useState, useEffect, useReducer); no external state library required

### Browser Support
- Modern browsers only: Chrome, Firefox, Safari, Edge (latest 2 versions)
- No Internet Explorer support
- JavaScript MUST be enabled

### Performance Constraints
- Production bundle size: Keep reasonable (monitor with Vite build output)
- No blocking operations on main thread (use Web Workers for AI)
- Efficient re-rendering (avoid unnecessary component updates)

**Rationale**: Standardized stack ensures compatibility, leverages community support, and provides modern development experience.

## Development Workflow

### Git Practices (MANDATORY)
- **Branch Strategy**: Feature branches for all new work (e.g., `feature/pawn-promotion`, `fix/castling-bug`)
- **Commit Messages**: Clear, descriptive format: `<type>: <description>`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
  - Example: `feat: add pawn promotion modal with piece selection`
  - Example: `fix: resolve castling validation when king in check`
- **Atomic Commits**: Each commit represents one logical change
- **Pull Requests**: All changes MUST go through PR review before merging to main

### Code Review Standards
Before submitting code for review, verify:
- [ ] Code follows naming conventions and organization standards
- [ ] Imports organized correctly (external → internal → styles)
- [ ] No ESLint errors or warnings
- [ ] All tests pass (`npm test`)
- [ ] Code coverage meets 80%+ target
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] No console.log statements left in production code
- [ ] Comments explain "why" not "what"
- [ ] Functions/components have single responsibility
- [ ] Error handling implemented for all failure paths

### Testing Workflow (TDD CYCLE)
1. **Write Test**: Create failing test describing desired behavior
2. **Implement**: Write minimal code to make test pass
3. **Refactor**: Clean up code while keeping tests green
4. **Verify**: Run full test suite before commit
5. **Commit**: Commit test and implementation together

### Pre-commit Checklist
- [ ] `npm run lint` passes with no errors/warnings
- [ ] `npm test` passes all tests
- [ ] `npm run build` compiles successfully
- [ ] No .only or .skip in test files (unless documented reason)
- [ ] Git commit message is clear and follows format

**Rationale**: Structured workflow prevents broken code from entering main branch. Code review catches issues early and shares knowledge across team.

## Quality Gates

### Merge Requirements (BLOCKING)
Pull requests CANNOT be merged unless:
1. All tests pass (100% of test suite)
2. Code coverage maintained at 80%+ (no decrease from current coverage)
3. ESLint passes with zero errors (warnings acceptable if justified)
4. TypeScript compilation succeeds with no errors
5. At least one code review approval from team member
6. All review comments addressed or discussed

### Success Criteria Validation
Before marking feature complete, verify against functional requirements in `docs/functional-requirements.md`:
- Feature checklist items marked complete
- Acceptance criteria met
- User experience validated (manual testing)
- Edge cases tested

**Rationale**: Quality gates ensure only production-ready code enters main branch. Prevents accumulation of technical debt and broken features.

## Governance

### Constitution Authority
- This constitution supersedes all other development practices
- All team members MUST comply with principles and standards defined herein
- Code reviews MUST verify compliance with constitution requirements
- Deviations require explicit justification and team discussion

### Amendment Process
To amend this constitution:
1. Propose change with clear rationale and impact analysis
2. Discuss with team to reach consensus
3. Update constitution with new version number following semantic versioning:
   - **MAJOR**: Backward-incompatible changes (principle removal/redefinition)
   - **MINOR**: New principle/section added or materially expanded guidance
   - **PATCH**: Clarifications, wording fixes, typo corrections
4. Create Sync Impact Report documenting changes and affected templates
5. Update all dependent documentation (`docs/*.md`, templates)
6. Communicate changes to all team members

### Continuous Improvement
- Review constitution quarterly or when significant project changes occur
- Incorporate lessons learned from development process
- Update based on team feedback and new best practices
- Keep aligned with project evolution

### Reference Documentation
For detailed implementation guidance, refer to:
- **Coding Standards**: `docs/coding-guidelines.md`
- **Testing Strategy**: `docs/testing-guidelines.md`
- **UI Design System**: `docs/ui-guidelines.md`
- **Functional Requirements**: `docs/functional-requirements.md`
- **Project Overview**: `docs/project-overview.md`

**Version**: 1.0.0 | **Ratified**: 2026-02-12 | **Last Amended**: 2026-02-12
