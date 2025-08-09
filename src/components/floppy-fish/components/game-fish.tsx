import React from 'react';
import { FISH_SIZE, FISH_X } from '../game-constants';

interface GameFishProps {
  fishY: number;
  scale: number;
  gameOver: boolean;
}

export function GameFish({ fishY, scale, gameOver }: GameFishProps) {
  return (
    <img
      src="/fish/blue-fish.svg"
      alt="Fish"
      className="absolute z-10 select-none"
      style={{
        left: FISH_X * scale,
        top: fishY * scale,
        width: FISH_SIZE * scale,
        height: FISH_SIZE * scale,
        filter: gameOver ? "grayscale(1)" : "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
} 