import React from 'react';
import { Fish } from '../types';

interface GameInfoPanelProps {
  selectedFish: Fish;
  score: number;
  coinsCollected: number;
  bestScore: number;
}

export function GameInfoPanel({ selectedFish, score, coinsCollected, bestScore }: GameInfoPanelProps) {
  return (
    <div className="w-full max-w-xl bg-blue-800/30 border border-blue-600/30 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src="/fish/blue-fish.svg" alt="Fish" className="w-12 h-12 object-contain" />
        <div>
          <div className="text-white font-bold">{selectedFish.name}</div>
          <div className="text-blue-200 text-xs">Multiplier: {selectedFish.experienceMultiplier}x</div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="text-white font-bold">Score: {score}</div>
        <div className="text-yellow-400 text-sm">Coins: {coinsCollected}</div>
        <div className="text-blue-200 text-xs">Best: {bestScore}</div>
      </div>
    </div>
  );
} 