# Chess Web App UI Guidelines

## 1. Visual Style
- Use a classic chessboard look with traditional piece designs.
- Board squares should be styled in Seattle Seahawks colors:
  - Dark squares: Deep navy blue (#002244)
  - Light squares: Bright green (#69BE28)
  - Accent colors: Silver (#A5ACAF) and white (#FFFFFF) for borders, highlights, and UI elements
- Chess pieces should be easily distinguishable, using white and navy blue for piece colors.

## 2. Color Mode
- Provide a toggle for light and dark mode within the app UI.
- Default to dark mode (navy blue background) for a classic feel.
- Ensure all UI elements (buttons, panels, move highlights) adapt to the selected mode.

## 3. Animations
- Animate piece movements for a smooth, engaging experience.
- If performance issues arise, use simple transitions (fade or slide) for piece changes.
- Highlight the last move with a subtle animation or border.

## 4. Accessibility
- Accessibility is a future goal; current UI will focus on visual clarity and usability for desktop users.

## 5. Platform Priority
- Prioritize desktop layout and interactions.
- Responsive design is optional for initial release; mobile support can be added later.

## 6. Branding
- Use Seattle Seahawks color palette for all UI elements.
- Incorporate Seahawks-inspired fonts and icons where appropriate.
- Optionally, add a Seahawks logo or theme in the app header.

## 7. UI Elements
- Clear, intuitive controls for move selection, undo/redo, and game management.
- Move history and captured pieces displayed in side panels.
- Minimal clutter; focus on chessboard and essential controls.

## Layout

### Overall Structure
- **Single Column**: Full-width responsive single column
- **Max Width**: 600px (on larger screens)
- **Margins**: Generous side margins (16px on mobile, 32px on desktop)
- **Padding**: All sections have `md` (24px) padding

## Components

### Chessboard Component
- **Container**: Card with subtle shadow and border radius (8px)
- **Background**: Alternating square colors (navy blue #002244 and bright green #69BE28)
- **Border**: 2px solid silver (#A5ACAF)
- **Padding**: `sm` (16px) around board
- **Size**: Responsive, maintains square aspect ratio
- **Hover Effect**: Subtle highlight on hoverable squares

#### Board Layout
- **Coordinates**: Algebraic notation (a-h, 1-8) on board edges in white/silver
- **Selected Piece**: Highlighted with bright border
- **Legal Move Indicators**: Small dots or circles on valid destination squares
- **Last Move Highlight**: Both source and destination squares highlighted with accent color
- **Check Indicator**: King square highlighted with danger color when in check

### Game Control Panel
- **Container**: Card with subtle shadow and border radius (8px)
- **Background**: Surface color (adapts to light/dark mode)
- **Padding**: `md` (24px)
- **Margin**: `md` (24px) between sections
- **Border**: 1px solid border color

#### Panel Layout
- **Turn Indicator**: Large text showing "White to Move" or "Black to Move"
- **Game Status**: Display for check, checkmate, stalemate, draw notifications
- **Action Buttons**: New Game, Resign, Undo (aligned horizontally)
  - Spacing: `sm` (16px) between buttons
- **Color Selection**: Radio buttons or toggle for white/black selection

### Move History Panel
- **Container**: Scrollable panel with rounded corners (4px)
- **Background**: Surface color with slight contrast
- **Height**: Fixed height (300px) with overflow scroll
- **Padding**: `sm` (16px)
- **Font**: Monospace for algebraic notation

#### History Layout
- **Move Pairs**: Displayed as numbered rows (1. e4 e5, 2. Nf3 Nc6)
- **Current Move**: Highlighted with primary color background
- **Typography**: Caption size, monospace font
- **Auto-scroll**: Automatically scrolls to latest move

### Captured Pieces Display
- **Container**: Horizontal strip showing captured pieces
- **Background**: Transparent or subtle surface color
- **Padding**: `xs` (8px)
- **Pieces**: Small icons (16px × 16px) grouped by color
  - White captured pieces on one side
  - Black captured pieces on other side
- **Spacing**: 4px between piece icons

### Pawn Promotion Dialog
- **Overlay**: Semi-transparent dark overlay (rgba(0, 34, 68, 0.8))
- **Dialog Box**: Centered, card-like container with rounded corners (8px)
- **Title**: "Choose Promotion Piece"
- **Content**: Four large piece icons (Queen, Rook, Bishop, Knight)
- **Layout**: Horizontal row of selectable pieces (48px × 48px each)
- **Padding**: `md` (24px) throughout dialog
- **Hover**: Piece icons grow slightly and show border on hover

### Buttons
- **Padding**: 8px 16px (vertical × horizontal)
- **Border Radius**: 4px
- **Font**: Button typography, 14px
- **Background**: Primary color (bright green #69BE28)
- **Text Color**: Navy blue (#002244)
- **Hover State**: Slightly darker shade of background
- **Disabled State**: Opacity 0.5

#### Button Variants
- **Primary**: Bright green background (#69BE28), navy text
- **Secondary**: Transparent background with 1px navy border, navy text
- **Danger**: Red background (#D32F2F), white text
- **Icon Button**: Square (32px × 32px), transparent background, icon only

### Icons
- **Size**: 20px × 20px (standard), 24px × 24px (large), 16px × 16px (small)
- **Color**: Inherit from context (primary, secondary, danger, silver)
- **Cursor**: Pointer on interactive icons
- **Hover**: Color shift to primary or lighter shade

### Game End Modal
- **Overlay**: Semi-transparent dark overlay (rgba(0, 34, 68, 0.9))
- **Modal Box**: Centered, large card-like container with rounded corners (12px)
- **Title**: "Checkmate!" / "Stalemate!" / "Draw!"
- **Winner Message**: Large text announcing result
- **Explanation**: Smaller text explaining the game end condition
- **Buttons**: New Game (primary) and Close (secondary)
- **Padding**: `lg` (32px) throughout modal

## Interaction States

### Hover States (Desktop)
- **Chessboard Squares**: Subtle brightness increase on legal move destinations
- **Piece on Square**: Cursor changes to grab/pointer, piece slightly elevated (shadow)
- **Buttons**: Darker or lighter shade depending on button type
- **Icon Buttons**: Background color appears with primary color tint
- **Move History Items**: Background highlight on hover

### Focus States
- **Buttons**: Visible 2px outline in primary color with 2px offset
- **Interactive Board Squares**: Subtle border highlight
- **Modal Dialogs**: Focus trapped within modal, tab navigation works
- **Keyboard Navigation**: Clear focus indicators on all interactive elements

### Active States
- **Pressed Buttons**: Even darker shade, slight inset shadow effect
- **Selected Piece**: Strong border highlight in primary color
- **Dragging Piece**: Piece follows cursor, semi-transparent, elevated shadow
- **Clicked Square**: Brief flash animation before move execution

### Disabled States
- **Buttons**: Opacity 0.5, cursor not-allowed
- **Squares**: No hover effect, cursor default
- **Game Controls**: Grayed out when not applicable (e.g., Undo when no moves)

### Loading States
- **AI Thinking**: Subtle pulse animation on opponent's side
- **Move Calculation**: Optional spinner or "AI is thinking..." text
- **Page Load**: Board skeleton or loading indicator before game initializes

---

These guidelines ensure a classic, Seahawks-themed chess experience with smooth animations and desktop-first design. The component specifications provide clear implementation details for all UI elements, interaction states, and visual feedback mechanisms.