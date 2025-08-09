import React from 'react';
import { Coin } from '../types';
import { COIN_SIZE } from '../game-constants';

interface GameCoinsProps {
  coins: Coin[];
  scale: number;
}

export function GameCoins({ coins, scale }: GameCoinsProps) {
  return (
    <>
      {coins.map((coin, idx) => (
        <div
          key={idx}
          className="absolute bg-yellow-400 border-2 border-yellow-600 rounded-full flex items-center justify-center animate-pulse select-none"
          style={{
            left: coin.x * scale,
            top: coin.y * scale,
            width: COIN_SIZE * scale,
            height: COIN_SIZE * scale,
            zIndex: 8,
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            pointerEvents: "none",
          }}
        >
          <span className="text-yellow-800 font-bold text-xs">💰</span>
        </div>
      ))}
    </>
  );
} 