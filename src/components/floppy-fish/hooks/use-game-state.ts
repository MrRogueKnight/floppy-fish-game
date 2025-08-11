import { useState, useEffect, useCallback } from 'react';
import { GameState, Column, Coin } from '../types';
import { GAME_HEIGHT, getRandomGapY, COIN_SPAWN_CHANCE } from '../game-constants';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    fishY: GAME_HEIGHT / 2,
    velocity: 0,
    columns: [],
    coins: [],
    score: 0,
    coinsCollected: 0,
    bestScore: 0,
    gameOver: false,
    started: false,
  });

  // Load best score from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("floppyFishBestScore");
    if (stored) {
      setGameState(prev => ({ ...prev, bestScore: Number(stored) }));
    }
  }, []);

  // Save best score to localStorage
  useEffect(() => {
    if (gameState.score > gameState.bestScore) {
      setGameState(prev => ({ ...prev, bestScore: gameState.score }));
      localStorage.setItem("floppyFishBestScore", String(gameState.score));
    }
  }, [gameState.score, gameState.bestScore]);

  // Reset game state
  const resetGame = useCallback(() => {
    setGameState({
      fishY: GAME_HEIGHT / 2,
      velocity: 0,
      columns: [],
      coins: [],
      score: 0,
      coinsCollected: 0,
      bestScore: gameState.bestScore, // Keep best score
      gameOver: false,
      started: false,
    });
  }, [gameState.bestScore]);

  // Update specific game state properties
  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  // Add a new column
  const addColumn = useCallback((column: Column) => {
    setGameState(prev => ({
      ...prev,
      columns: [...prev.columns, column],
    }));
  }, []);

  // Add a new coin
  const addCoin = useCallback((coin: Coin) => {
    setGameState(prev => ({
      ...prev,
      coins: [...prev.coins, coin],
    }));
  }, []);

  // Update columns
  const updateColumns = useCallback((updater: (columns: Column[]) => Column[]) => {
    setGameState(prev => ({
      ...prev,
      columns: updater(prev.columns),
    }));
  }, []);

  // Update coins
  const updateCoins = useCallback((updater: (coins: Coin[]) => Coin[]) => {
    setGameState(prev => ({
      ...prev,
      coins: updater(prev.coins),
    }));
  }, []);

  // Start game with first column and coin
  const startGame = useCallback(() => {
    const firstGapY = getRandomGapY();
    const firstColumn: Column = { x: 800, gapY: firstGapY };
    
    setGameState(prev => ({
      ...prev,
      started: true,
      columns: [firstColumn],
      coins: Math.random() < COIN_SPAWN_CHANCE 
        ? [{ x: 830, y: firstGapY + 120 / 2 }] 
        : [],
    }));
  }, []);

  return {
    gameState,
    updateGameState,
    resetGame,
    addColumn,
    addCoin,
    updateColumns,
    updateCoins,
    startGame,
  };
} 