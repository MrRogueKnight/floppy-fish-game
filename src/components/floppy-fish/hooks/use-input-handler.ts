import { useEffect, useCallback } from 'react';

export function useInputHandler(
  onJump: () => void,
  gameOver: boolean,
  gameAreaRef: React.RefObject<HTMLDivElement>
) {
  // Jump handler
  const jump = useCallback(() => {
    if (!gameOver) {
      onJump();
    }
  }, [onJump, gameOver]);

  // Keyboard input handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };
    
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [jump]);

  // Mouse input handler
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (gameAreaRef.current && gameAreaRef.current.contains(e.target as Node)) {
        jump();
      }
    };
    
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [jump, gameAreaRef]);

  // Touch input handler
  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      if (gameAreaRef.current && gameAreaRef.current.contains(e.target as Node)) {
        jump();
      }
    };
    
    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, [jump, gameAreaRef]);

  return { jump };
} 