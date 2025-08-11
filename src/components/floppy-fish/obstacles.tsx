import { Fragment } from "react";

interface ObstaclesProps {
  columns: { x: number; gapY: number; scored?: boolean }[];
  scale: number;
  COLUMN_WIDTH: number;
  GAP_HEIGHT: number;
  GAME_HEIGHT: number;
}

export function Obstacles({ columns, scale, COLUMN_WIDTH, GAP_HEIGHT, GAME_HEIGHT }: ObstaclesProps) {
  console.log('Rendering obstacles:', columns.length, columns);
  
  // If no columns, show a test obstacle
  const displayColumns = columns.length > 0 ? columns : [{ x: 400, gapY: 150 }];
  
  return (
    <>
      {displayColumns.map((col, idx) => (
        <Fragment key={idx}>
          {/* Top column - using solid colors instead of images */}
          <div
            className="absolute bg-green-600 border-2 border-green-800"
            style={{
              left: col.x * scale,
              top: 0,
              width: COLUMN_WIDTH * scale,
              height: col.gapY * scale,
              zIndex: 5,
            }}
          />
          {/* Bottom column - using solid colors instead of images */}
          <div
            className="absolute bg-green-600 border-2 border-green-800"
            style={{
              left: col.x * scale,
              top: (col.gapY + GAP_HEIGHT) * scale,
              width: COLUMN_WIDTH * scale,
              height: (GAME_HEIGHT - col.gapY - GAP_HEIGHT) * scale,
              zIndex: 5,
            }}
          />
          {/* Debug info - remove this later */}
          <div
            className="absolute text-white text-xs bg-black/50 px-1 rounded"
            style={{
              left: col.x * scale,
              top: 10,
              zIndex: 10,
            }}
          >
            Col {idx}
          </div>
        </Fragment>
      ))}
    </>
  );
} 