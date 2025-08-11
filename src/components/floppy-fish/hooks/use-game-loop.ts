import { useEffect, useRef, useCallback } from 'react';
import { GameState, Column, Coin } from '../types';
import { 
  GRAVITY, 
  JUMP_VELOCITY, 
  COLUMN_SPEED, 
  COLUMN_INTERVAL, 
  GAME_WIDTH, 
  GAME_HEIGHT, 
  FISH_SIZE, 
  FISH_X, 
  COLUMN_WIDTH, 
  GAP_HEIGHT, 
  COIN_SIZE,
  getRandomGapY,
  COIN_SPAWN_CHANCE
} from '../game-constants';

export function useGameLoop(
  gameState: GameState,
  updateGameState: (updates: Partial<GameState>) => void,
  addColumn: (column: Column) => void,
  addCoin: (coin: Coin) => void,
  updateColumns: (updater: (columns: Column[]) => Column[]) => void,
  updateCoins: (updater: (coins: Coin[]) => Coin[]) => void,
  startGame: () => void
) {
  const animationRef = useRef<number>();
  const lastColumnTime = useRef<number>(0);

  // Physics update
  const updatePhysics = useCallback(() => {
    if (!gameState.started) return;

    // Update fish physics
    const newVelocity = gameState.velocity + GRAVITY;
    const newFishY = gameState.fishY + newVelocity;

    updateGameState({
      velocity: newVelocity,
      fishY: newFishY,
    });
  }, [gameState.started, gameState.velocity, gameState.fishY, updateGameState]);

  // Move game objects
  const moveObjects = useCallback(() => {
    if (!gameState.started) return;

    // Move columns
    updateColumns(cols => 
      cols
        .map(col => ({ ...col, x: col.x - COLUMN_SPEED }))
        .filter(col => col.x + COLUMN_WIDTH > 0)
    );

    // Move coins
    updateCoins(coins => 
      coins
        .map(coin => ({ ...coin, x: coin.x - COLUMN_SPEED }))
        .filter(coin => coin.x + COIN_SIZE > 0)
    );
  }, [gameState.started, updateColumns, updateCoins]);

  // Spawn new objects
  const spawnObjects = useCallback((now: number) => {
    if (!gameState.started) return;

    if (now - lastColumnTime.current > COLUMN_INTERVAL) {
      const newGapY = getRandomGapY();
      const newColumn: Column = { x: GAME_WIDTH, gapY: newGapY };
      
      addColumn(newColumn);
      
      // Spawn coin with the new column
      if (Math.random() < COIN_SPAWN_CHANCE) {
        const newCoin: Coin = { 
          x: GAME_WIDTH + 30, 
          y: newGapY + GAP_HEIGHT / 2 
        };
        addCoin(newCoin);
      }
      
      lastColumnTime.current = now;
    }
  }, [gameState.started, addColumn, addCoin]);

  // Score points
  const updateScore = useCallback(() => {
    if (!gameState.started) return;

    updateColumns(cols => {
      let scored = false;
      const updated = cols.map(col => {
        if (!col.scored && col.x + COLUMN_WIDTH < FISH_X) {
          scored = true;
          return { ...col, scored: true };
        }
        return col;
      });
      if (scored) {
        updateGameState({ score: gameState.score + 1 });
      }
      return updated;
    });
  }, [gameState.started, gameState.score, updateColumns, updateGameState]);

  // Collision detection
  const checkCollisions = useCallback(() => {
    const fishRect = {
      left: FISH_X,
      right: FISH_X + FISH_SIZE,
      top: gameState.fishY,
      bottom: gameState.fishY + FISH_SIZE,
    };

    // Out of bounds check
    if (fishRect.top < 0 || fishRect.bottom > GAME_HEIGHT) {
      updateGameState({ gameOver: true });
      return;
    }

    // Column collision check
    for (const col of gameState.columns) {
      const topRect = {
        left: col.x,
        right: col.x + COLUMN_WIDTH,
        top: 0,
        bottom: col.gapY,
      };
      const bottomRect = {
        left: col.x,
        right: col.x + COLUMN_WIDTH,
        top: col.gapY + GAP_HEIGHT,
        bottom: GAME_HEIGHT,
      };

      if (
        (fishRect.left < topRect.right && fishRect.right > topRect.left && 
         fishRect.top < topRect.bottom && fishRect.bottom > topRect.top) ||
        (fishRect.left < bottomRect.right && fishRect.right > bottomRect.left && 
         fishRect.top < bottomRect.bottom && fishRect.bottom > bottomRect.top)
      ) {
        updateGameState({ gameOver: true });
        return;
      }
    }

    // Coin collision check
    updateCoins(coins => {
      const updated = coins.map(coin => {
        if (coin.collected) return coin;

        const coinRect = {
          left: coin.x,
          right: coin.x + COIN_SIZE,
          top: coin.y,
          bottom: coin.y + COIN_SIZE,
        };

        if (
          fishRect.left < coinRect.right && fishRect.right > coinRect.left &&
          fishRect.top < coinRect.bottom && fishRect.bottom > coinRect.top
        ) {
          updateGameState({ 
            coinsCollected: gameState.coinsCollected + 1,
            score: gameState.score + 5 // Bonus points for coins
          });
          return { ...coin, collected: true };
        }
        return coin;
      });

      return updated.filter(coin => !coin.collected);
    });
  }, [gameState.fishY, gameState.columns, gameState.coinsCollected, gameState.score, updateGameState, updateCoins]);

  // Main game loop
  useEffect(() => {
    if (gameState.gameOver) return;

    function gameLoop(now: number) {
      if (gameState.started) {
        updatePhysics();
        moveObjects();
        spawnObjects(now);
        updateScore();
      }
      
      checkCollisions();
      
      animationRef.current = requestAnimationFrame(gameLoop);
    }

    animationRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState.gameOver, gameState.started, updatePhysics, moveObjects, spawnObjects, updateScore, checkCollisions]);

  // Stop animation on game over
  useEffect(() => {
    if (gameState.gameOver && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [gameState.gameOver]);

  // Jump handler
  const jump = useCallback(() => {
    if (!gameState.started) {
      startGame();
      lastColumnTime.current = performance.now();
    }
    updateGameState({ velocity: JUMP_VELOCITY });
  }, [gameState.started, startGame, updateGameState]);

  return { jump };
} 