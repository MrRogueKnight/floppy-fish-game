import React from 'react';
import { Column } from '../types';
import { COLUMN_WIDTH, GAP_HEIGHT, GAME_HEIGHT } from '../game-constants';

interface GameObstaclesProps {
  columns: Column[];
  scale: number;
}

export function GameObstacles({ columns, scale }: GameObstaclesProps) {
  return (
    <>
      {columns.map((col, idx) => (
        <React.Fragment key={idx}>
          {/* Top column */}
          <img
            src="/mini-games/element-up.webp"
            alt="Column Top"
            className="absolute select-none"
            style={{
              left: col.x * scale,
              top: 0,
              width: COLUMN_WIDTH * scale,
              height: col.gapY * scale,
              objectFit: "cover",
              zIndex: 5,
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              pointerEvents: "none",
            }}
          />
          {/* Bottom column */}
          <img
            src="/mini-games/element-down.webp"
            alt="Column Bottom"
            className="absolute select-none"
            style={{
              left: col.x * scale,
              top: (col.gapY + GAP_HEIGHT) * scale,
              width: COLUMN_WIDTH * scale,
              height: (GAME_HEIGHT - col.gapY - GAP_HEIGHT) * scale,
              objectFit: "cover",
              zIndex: 5,
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              pointerEvents: "none",
            }}
          />
        </React.Fragment>
      ))}
    </>
  );
} 