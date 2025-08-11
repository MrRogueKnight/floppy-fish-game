// Type definitions for the Floppy Fish game
export interface Fish {
  id: string;
  name: string;
  image: string;
  experienceMultiplier: number;
}

export interface FloppyFishGameProps {
  selectedFish: Fish;
}

export interface Column {
  x: number;
  gapY: number;
  scored?: boolean;
}

export interface Coin {
  x: number;
  y: number;
  collected?: boolean;
}

export interface GameState {
  fishY: number;
  velocity: number;
  columns: Column[];
  coins: Coin[];
  score: number;
  coinsCollected: number;
  bestScore: number;
  gameOver: boolean;
  started: boolean;
} 