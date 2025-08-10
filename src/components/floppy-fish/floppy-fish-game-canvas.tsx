import React from "react";
import { FloppyFishGame } from "./floppy-fish-game";

interface FloppyFishGameCanvasProps {
  selectedFish: {
    id: string;
    name: string;
    image: string;
    experienceMultiplier: number;
  };
}

export function FloppyFishGameCanvas({ selectedFish }: FloppyFishGameCanvasProps) {
  return <FloppyFishGame selectedFish={selectedFish} />;
} 