# Floppy Fish Game

A fun and addictive Flappy Bird-style game built with React, TypeScript, and Tailwind CSS. Control a fish and navigate through obstacles by jumping through gaps.

## Features

- **Smooth Gameplay**: Responsive controls with keyboard (Space) and mouse/touch support
- **Score Tracking**: Keep track of your current score and best score (saved locally)
- **Responsive Design**: Adapts to different screen sizes
- **Modern UI**: Beautiful gradient background and smooth animations
- **Game Over Screen**: Elegant game over screen with restart functionality

## How to Play

1. **Start the Game**: Press Space or click on the game area to start
2. **Control the Fish**: Press Space or click/tap to make the fish jump
3. **Avoid Obstacles**: Navigate through the gaps in the columns
4. **Score Points**: Each column you pass gives you 1 point
5. **Restart**: When game over, press Space or click "Play Again" to restart

## Controls

- **Space**: Jump
- **Mouse Click**: Jump (when clicking on game area)
- **Touch**: Jump (on mobile devices)

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd floppy-fish-game
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Canvas API**: For smooth game rendering

## Project Structure

```
src/
├── components/
│   ├── floppy-fish-game.tsx          # Main game component
│   └── floppy-fish/
│       ├── floppy-fish-game-canvas.tsx
│       ├── fish.tsx                   # Fish component
│       ├── obstacles.tsx              # Obstacle columns
│       ├── game-ui.tsx                # Score and start overlay
│       ├── game-over-screen.tsx       # Game over screen
│       └── bottom-info-panel.tsx      # Fish info and scores
├── hooks/
│   └── floppy-fish/
│       ├── use-game-logic.ts          # Main game logic
│       └── use-input-handler.ts       # Input handling
├── App.tsx                            # Main app component
├── main.tsx                           # React entry point
└── index.css                          # Global styles

public/
├── mini-games/                        # Game assets
│   ├── background.webp
│   ├── element-up.webp
│   └── element-down.webp
└── fish/                              # Fish images
    ├── blue-fish.svg
    └── blue-fish-flip.svg
```

## Game Mechanics

- **Physics**: Simple gravity and jump mechanics
- **Collision Detection**: Precise collision detection between fish and obstacles
- **Scoring**: Points awarded for passing through columns
- **Difficulty**: Obstacles spawn at random heights with consistent spacing
- **Performance**: Optimized with requestAnimationFrame for smooth 60fps gameplay

## Customization

You can easily customize the game by:

1. **Changing Fish**: Replace the fish SVG files in `public/fish/`
2. **Modifying Game Constants**: Adjust values in `use-game-logic.ts`
3. **Styling**: Modify Tailwind classes or add custom CSS
4. **Adding Features**: Extend the game with power-ups, different fish types, etc.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!
