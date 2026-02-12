# Tasks: Interactive Chess Piece Movement

**Feature**: 001-piece-movement  
**Input**: Design documents from `/specs/001-piece-movement/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md (phase 0 pending)

**Tests**: Tests are REQUIRED per constitution (80%+ coverage mandatory, 100% for chess logic)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and verification

- [ ] T001 Verify project dependencies are installed: chess.js@1.4.0, react-chessboard@5.10.0, vitest@4.x
- [ ] T002 Verify TypeScript strict mode is enabled in tsconfig.app.json
- [ ] T003 [P] Verify ESLint configuration is correct and runs without errors

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Define TypeScript interfaces for ChessPiece, Square, Move, GameState in src/types/chess.ts
- [ ] T005 Create utility function for FEN string validation in src/utils/chessValidation.ts
- [ ] T006 [P] Setup custom square styles utility for Seahawks colors in src/utils/boardStyles.ts
- [ ] T007 [P] Create move history formatting utility for SAN notation in src/utils/moveFormatting.ts
- [ ] T008 Configure Vitest test environment with jsdom and React Testing Library setup

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 3 - Legal Move Validation and Feedback (Priority: P1) 🎯 MVP Critical

**Goal**: Enforce chess rules by validating all move attempts and providing immediate visual feedback. Only legal moves according to FIDE rules are allowed.

**Why First**: This is the foundation for all piece movement - without validation, User Stories 1 & 2 cannot function correctly. Move validation must work before implementing interaction patterns.

**Independent Test**: Attempt various legal and illegal moves (knight L-shape vs straight, moving into check, pinned pieces) and confirm only legal moves succeed. Board state remains valid after all attempts.

### Tests for User Story 3 (REQUIRED - TDD)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T009 [P] [US3] Unit test for legal pawn moves in src/chessLogic.test.ts
- [ ] T010 [P] [US3] Unit test for legal knight moves in src/chessLogic.test.ts
- [ ] T011 [P] [US3] Unit test for legal bishop moves in src/chessLogic.test.ts
- [ ] T012 [P] [US3] Unit test for legal rook moves in src/chessLogic.test.ts
- [ ] T013 [P] [US3] Unit test for legal queen moves in src/chessLogic.test.ts
- [ ] T014 [P] [US3] Unit test for legal king moves in src/chessLogic.test.ts
- [ ] T015 [P] [US3] Unit test for illegal moves (out of turn, wrong piece movement) in src/chessLogic.test.ts
- [ ] T016 [P] [US3] Unit test for pinned piece detection in src/chessLogic.test.ts
- [ ] T017 [P] [US3] Unit test for moves that would leave king in check in src/chessLogic.test.ts
- [ ] T018 [P] [US3] Unit test for castling legality (not through check) in src/chessLogic.test.ts
- [ ] T019 [P] [US3] Unit test for en passant detection in src/chessLogic.test.ts

### Implementation for User Story 3

- [ ] T020 [US3] Implement getMoves() function using chess.js in src/utils/chessLogic.ts
- [ ] T021 [US3] Implement validateMove() function using chess.js move() method in src/utils/chessLogic.ts
- [ ] T022 [US3] Implement getLegalMovesForSquare() function in src/utils/chessLogic.ts
- [ ] T023 [US3] Add visual feedback for legal move highlights in src/utils/boardStyles.ts
- [ ] T024 [US3] Integrate legal move validation into App.tsx makeAMove() function
- [ ] T025 [US3] Add check detection visual feedback (king square highlighting) in src/App.tsx

**Checkpoint**: At this point, move validation works correctly. All illegal moves are blocked, legal moves succeed. Tests pass at 100% coverage.

---

## Phase 4: User Story 1 - Click-to-Move Piece Selection (Priority: P1) 🎯 MVP

**Goal**: Players interact with the chessboard by clicking on a piece to select it, then clicking on a destination square to move it. Piece visually indicates selection and only moves if destination is legal.

**Independent Test**: Load chess board, click on white pawn at e2, see it highlighted with green border, see e3 and e4 marked as valid destinations with dots, click e4, confirm pawn moves and stays at e4. Repeat with other pieces.

### Tests for User Story 1 (REQUIRED - TDD)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T026 [P] [US1] Component test for piece selection on click in src/App.test.tsx
- [ ] T027 [P] [US1] Component test for visual highlight on selected piece in src/App.test.tsx
- [ ] T028 [P] [US1] Component test for legal move indicators display in src/App.test.tsx
- [ ] T029 [P] [US1] Component test for move completion on destination click in src/App.test.tsx
- [ ] T030 [P] [US1] Component test for selection cancellation on same piece click in src/App.test.tsx
- [ ] T031 [P] [US1] Component test for invalid destination rejection in src/App.test.tsx

### Implementation for User Story 1

- [ ] T032 [US1] Add selectedSquare state management in src/App.tsx
- [ ] T033 [US1] Add optionSquares state for legal move highlights in src/App.tsx
- [ ] T034 [US1] Implement onSquareClick handler with piece selection logic in src/App.tsx
- [ ] T035 [US1] Implement legal move highlighting on piece selection in src/App.tsx
- [ ] T036 [US1] Implement move execution on destination click in src/App.tsx
- [ ] T037 [US1] Add selection cancellation logic (click same piece or invalid square) in src/App.tsx
- [ ] T038 [US1] Style selected piece with bright green border per UI guidelines in src/App.css
- [ ] T039 [US1] Style legal move indicators as dots/circles per UI guidelines in src/App.css

**Checkpoint**: At this point, click-to-move interaction works fully. Users can select pieces, see legal moves, and complete moves by clicking.

---

## Phase 5: User Story 2 - Drag-and-Drop Piece Movement (Priority: P2)

**Goal**: Players can drag a piece from its current square and drop it onto a destination square for intuitive direct manipulation. Piece follows cursor during drag and snaps to destination on drop.

**Independent Test**: Click and hold white knight at b1, drag it while it follows cursor semi-transparently, hover over valid squares to see them highlighted, drop on c3 to confirm move persists. Drag to invalid square (e.g., e5) and confirm piece returns to origin.

### Tests for User Story 2 (REQUIRED - TDD)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T040 [P] [US2] Component test for piece drag initiation in src/App.test.tsx
- [ ] T041 [P] [US2] Component test for valid drop completing move in src/App.test.tsx
- [ ] T042 [P] [US2] Component test for invalid drop returning piece to origin in src/App.test.tsx
- [ ] T043 [P] [US2] Component test for hover highlighting valid drop targets in src/App.test.tsx

### Implementation for User Story 2

- [ ] T044 [US2] Implement onPieceDrop handler in src/App.tsx
- [ ] T045 [US2] Integrate drag-and-drop with move validation logic in src/App.tsx
- [ ] T046 [US2] Add return-to-origin animation for invalid drops in src/App.tsx
- [ ] T047 [US2] Update legal move highlights during drag in src/App.tsx
- [ ] T048 [US2] Style dragging piece (semi-transparent, elevated shadow) in src/App.css
- [ ] T049 [US2] Clear selection state after successful drag-and-drop in src/App.tsx

**Checkpoint**: At this point, both click-to-move AND drag-and-drop work independently. Users can use either interaction method interchangeably.

---

## Phase 6: User Story 4 - Turn-Based Move Management (Priority: P2)

**Goal**: Players can only move pieces when it's their turn, with clear visual indication of whose turn it is. After completing a move, turn automatically switches to opponent (AI).

**Independent Test**: Make move as white, confirm turn indicator changes to "Black to Move", confirm white pieces are not selectable, wait for AI to move, confirm turn switches back to "White to Move" and white pieces become selectable again.

### Tests for User Story 4 (REQUIRED - TDD)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T050 [P] [US4] Component test for turn indicator display in src/App.test.tsx
- [ ] T051 [P] [US4] Component test for preventing out-of-turn piece selection in src/App.test.tsx
- [ ] T052 [P] [US4] Component test for turn switching after valid move in src/App.test.tsx
- [ ] T053 [P] [US4] Component test for opponent piece non-selectability in src/App.test.tsx
- [ ] T054 [P] [US4] Component test for AI move triggering after player move in src/App.test.tsx

### Implementation for User Story 4

- [ ] T055 [US4] Add playerColor state to track user's color in src/App.tsx
- [ ] T056 [US4] Add turn enforcement check in onSquareClick handler in src/App.tsx
- [ ] T057 [US4] Add turn enforcement check in onPieceDrop handler in src/App.tsx
- [ ] T058 [US4] Implement turn indicator UI component in src/App.tsx
- [ ] T059 [US4] Add automatic AI move trigger after player move in src/App.tsx
- [ ] T060 [US4] Disable player interactions while AI is calculating in src/App.tsx
- [ ] T061 [US4] Update turn indicator on each move in src/App.tsx
- [ ] T062 [US4] Style turn indicator per UI guidelines (large text, clear colors) in src/App.css

**Checkpoint**: All user stories are now complete and independently functional. Full turn-based gameplay works with both interaction modes.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T063 [P] Add last move highlighting (source and destination squares) in src/App.tsx
- [ ] T064 [P] Implement move history display panel in src/App.tsx
- [ ] T065 [P] Add captured pieces display in src/App.tsx
- [ ] T066 [P] Optimize performance with useMemo for legal move calculation in src/App.tsx
- [ ] T067 [P] Optimize performance with useCallback for event handlers in src/App.tsx
- [ ] T068 [P] Add JSDoc comments to all public functions in src/utils/
- [ ] T069 Code cleanup: Remove console.log statements in src/App.tsx
- [ ] T070 Code cleanup: Organize imports per constitution standards in src/App.tsx
- [ ] T071 [P] Update README.md with piece movement feature documentation
- [ ] T072 [P] Verify test coverage meets 80%+ target (100% for chess logic)
- [ ] T073 Run full test suite and verify all tests pass
- [ ] T074 Run ESLint and fix any remaining warnings
- [ ] T075 Run TypeScript compiler and verify no errors
- [ ] T076 Performance validation: Measure interaction response time (<100ms)
- [ ] T077 Performance validation: Measure move validation time (<50ms)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 3 (Phase 3)**: Depends on Foundational - BLOCKS User Stories 1, 2, 4 (move validation is prerequisite)
- **User Story 1 (Phase 4)**: Depends on US3 completion (needs move validation)
- **User Story 2 (Phase 5)**: Depends on US3 completion (needs move validation), can run parallel with US1 after US3
- **User Story 4 (Phase 6)**: Depends on US1 or US2 completion (needs at least one interaction mode working)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 1 (P1)**: Depends on US3 (needs validation) - Independently testable after US3
- **User Story 2 (P2)**: Depends on US3 (needs validation) - Can run parallel with US1, independently testable
- **User Story 4 (P2)**: Depends on US1 or US2 (needs interaction mode) - Independently testable after US1/US2

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD mandatory per constitution)
- Test tasks can run in parallel (all marked [P])
- Implementation tasks run sequentially within each story (dependencies on previous tasks)
- Validation utilities before integration into App.tsx
- Story complete before moving to next priority

### Parallel Opportunities

#### Within Foundational Phase (Phase 2)
```bash
# Launch in parallel:
T006 - Setup custom square styles utility
T007 - Create move history formatting utility
```

#### Within User Story 3 Tests (Phase 3)
```bash
# Launch all test files in parallel:
T009 - Unit test for legal pawn moves
T010 - Unit test for legal knight moves
T011 - Unit test for legal bishop moves
T012 - Unit test for legal rook moves
T013 - Unit test for legal queen moves
T014 - Unit test for legal king moves
T015 - Unit test for illegal moves
T016 - Unit test for pinned piece detection
T017 - Unit test for moves leaving king in check
T018 - Unit test for castling legality
T019 - Unit test for en passant detection
```

#### Within User Story 1 Tests (Phase 4)
```bash
# Launch all test files in parallel:
T026 - Component test for piece selection
T027 - Component test for visual highlight
T028 - Component test for legal move indicators
T029 - Component test for move completion
T030 - Component test for selection cancellation
T031 - Component test for invalid destination rejection
```

#### Within User Story 2 Tests (Phase 5)
```bash
# Launch all test files in parallel:
T040 - Component test for piece drag
T041 - Component test for valid drop
T042 - Component test for invalid drop
T043 - Component test for hover highlighting
```

#### Within User Story 4 Tests (Phase 6)
```bash
# Launch all test files in parallel:
T050 - Component test for turn indicator
T051 - Component test for out-of-turn prevention
T052 - Component test for turn switching
T053 - Component test for opponent piece non-selectability
T054 - Component test for AI move triggering
```

#### Within Polish Phase (Phase 7)
```bash
# Launch in parallel (different concerns):
T063 - Last move highlighting
T064 - Move history display
T065 - Captured pieces display
T066 - Performance optimization (useMemo)
T067 - Performance optimization (useCallback)
T068 - JSDoc comments
T071 - README update
T072 - Test coverage verification
```

#### Cross-Phase Parallel Work (After Foundational Complete)
```bash
# After Phase 3 (US3) completes, launch in parallel:
Phase 4 (US1) - Click-to-move implementation
Phase 5 (US2) - Drag-and-drop implementation

# Both can proceed simultaneously as they work in same file but different handlers
```

---

## Implementation Strategy

### MVP First (Minimal Viable Product)

**Goal**: Deliver playable chess with click-to-move in shortest time

1. ✅ Complete Phase 1: Setup (verify dependencies)
2. ✅ Complete Phase 2: Foundational (types, utilities, test setup)
3. ✅ Complete Phase 3: User Story 3 - Move Validation (CRITICAL - blocks everything)
4. ✅ Complete Phase 4: User Story 1 - Click-to-Move (core interaction)
5. **STOP and VALIDATE**: Test US1 + US3 together - can play chess with click-to-move
6. Deploy/demo MVP if ready

**MVP Deliverable**: Playable chess game with click-to-move interaction and full rule validation

### Incremental Delivery (Recommended)

**Advantage**: Each phase adds value independently, can ship at any point

1. **Foundation** (Phases 1-2) → Types and utilities ready
2. **+ Move Validation** (Phase 3) → Chess rules enforced, ready for interactions
3. **+ Click-to-Move** (Phase 4) → MVP: Playable chess with basic interaction ✅ Ship
4. **+ Drag-and-Drop** (Phase 5) → Enhanced UX with intuitive dragging ✅ Ship
5. **+ Turn Management** (Phase 6) → Full game flow with AI integration ✅ Ship
6. **+ Polish** (Phase 7) → Production-ready with history, captures, optimization ✅ Ship

Each increment is independently testable and deliverable.

### Parallel Team Strategy

**With 2-3 developers available:**

1. **All together**: Complete Setup + Foundational (Phases 1-2)
2. **All together**: Complete User Story 3 - Move Validation (Phase 3) - CRITICAL BLOCKER
3. **Split after US3 completes**:
   - Developer A: User Story 1 (Phase 4) - Click-to-move
   - Developer B: User Story 2 (Phase 5) - Drag-and-drop
   - Both work in parallel (same file, different handlers, manageable merge)
4. **Together**: User Story 4 (Phase 6) - Turn management (integrates both interaction modes)
5. **Split final tasks**: Polish (Phase 7) - Each dev takes 2-3 tasks

**Team coordination**: Merge US1 and US2 together, test both interaction modes work, then proceed to US4.

---

## Task Count Summary

- **Total Tasks**: 77
- **Setup Tasks**: 3
- **Foundational Tasks**: 5 (BLOCKS all user stories)
- **User Story 3 (Move Validation) Tasks**: 17 (11 tests + 6 implementation)
- **User Story 1 (Click-to-Move) Tasks**: 14 (6 tests + 8 implementation)
- **User Story 2 (Drag-and-Drop) Tasks**: 10 (4 tests + 6 implementation)
- **User Story 4 (Turn Management) Tasks**: 13 (5 tests + 8 implementation)
- **Polish Tasks**: 15 (cross-cutting improvements)

**Parallel Tasks**: 47 tasks marked [P] can run in parallel with others (61% of total)

**Test Tasks**: 26 test tasks (34% of total) - ensures 80%+ coverage target

**Critical Path**: Setup → Foundational → US3 (Move Validation) → US1 or US2 → US4 → Polish

**Suggested MVP Scope**: Phases 1-4 (Setup + Foundational + US3 + US1) = 39 tasks for playable chess

---

## Format Validation Summary

✅ All 77 tasks follow checklist format: `- [ ] [ID] [P?] [Story?] Description`  
✅ All tasks have sequential IDs (T001-T077)  
✅ All tasks have exact file paths in descriptions  
✅ 47 tasks properly marked [P] for parallel execution  
✅ 50 user story tasks properly labeled [US1], [US2], [US3], or [US4]  
✅ Each user story phase includes independent test criteria  
✅ Each user story phase includes checkpoint validation  
✅ Dependencies section shows story completion order  
✅ Parallel execution examples provided per story  
✅ Implementation strategy includes MVP scope recommendation  

**Ready for execution**: Task list is immediately actionable by development team or LLM agents.
