// Game constants - centralized for easy management
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 400;
export const FISH_SIZE = 40;
export const GRAVITY = 0.35;
export const JUMP_VELOCITY = -4.5;
export const COLUMN_WIDTH = 60;
export const GAP_HEIGHT = 120;
export const COLUMN_INTERVAL = 1500; // ms
export const COLUMN_SPEED = 2;
export const FISH_X = 100;
export const COIN_SIZE = 20;
export const COIN_SPAWN_CHANCE = 0.3; // 30% chance per column

export function getRandomGapY(): number {
  const minY = 60;
  const maxY = GAME_HEIGHT - GAP_HEIGHT - 60;
  return Math.floor(Math.random() * (maxY - minY + 1)) + minY;
} 