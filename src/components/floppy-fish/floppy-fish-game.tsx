import React, { useRef } from "react";
import { FloppyFishGameProps } from "./types";
import { GAME_WIDTH, GAME_HEIGHT } from "./game-constants";
import { useGameState } from "./hooks/use-game-state";
import { useInputHandler } from "./hooks/use-input-handler";
import { useGameLoop } from "./hooks/use-game-loop";
import { GameFish } from "./components/game-fish";
import { GameObstacles } from "./components/game-obstacles";
import { GameCoins } from "./components/game-coins";
import { GameUI } from "./components/game-ui";
import { GameInfoPanel } from "./components/game-info-panel";

export function FloppyFishGame({ selectedFish }: FloppyFishGameProps) {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  
  // Custom hooks for game logic
  const {
    gameState,
    updateGameState,
    resetGame,
    addColumn,
    addCoin,
    updateColumns,
    updateCoins,
    startGame,
  } = useGameState();

  const { jump } = useGameLoop(
    gameState,
    updateGameState,
    addColumn,
    addCoin,
    updateColumns,
    updateCoins,
    startGame
  );

  // Input handling
  useInputHandler(jump, gameState.gameOver, gameAreaRef);

  // Responsive scaling
  const scale = Math.min(window.innerWidth * 0.9 / GAME_WIDTH, 1);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Game Area */}
      <div
        ref={gameAreaRef}
        className="relative bg-blue-900 rounded-xl overflow-hidden shadow-lg border border-blue-700 cursor-pointer select-none"
        style={{
          width: GAME_WIDTH * scale,
          height: GAME_HEIGHT * scale,
          backgroundImage: 'url("/mini-games/background.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
      >
        {/* Game Components */}
        <GameFish 
          fishY={gameState.fishY} 
          scale={scale} 
          gameOver={gameState.gameOver} 
        />
        
        <GameObstacles 
          columns={gameState.columns} 
          scale={scale} 
        />
        
        <GameCoins 
          coins={gameState.coins} 
          scale={scale} 
        />
        
        <GameUI 
          score={gameState.score}
          started={gameState.started}
          gameOver={gameState.gameOver}
          onResetGame={resetGame}
        />
      </div>
      
      {/* Info Panel */}
      <GameInfoPanel 
        selectedFish={selectedFish}
        score={gameState.score}
        coinsCollected={gameState.coinsCollected}
        bestScore={gameState.bestScore}
      />
    </div>
  );
} 