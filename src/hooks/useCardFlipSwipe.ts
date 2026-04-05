import { useRef, useCallback, useState } from 'react';

/** Minimum drag distance (px) to commit the flip */
const FLIP_THRESHOLD = 60;
/** Drag distance that maps to a full 180° rotation */
const DRAG_RANGE = 200;
/** Navigation swipe threshold (px) */
const NAV_THRESHOLD = 40;
/** Settle animation duration (ms) */
const SETTLE_MS = 350;

interface UseCardFlipSwipeOptions {
  isFlipped: boolean;
  noTransition?: boolean;
  onFlip: () => void;
  onSwipeNext: () => void;
}

export default function useCardFlipSwipe({
  isFlipped,
  noTransition,
  onFlip,
  onSwipeNext,
}: UseCardFlipSwipeOptions) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [dragRotation, setDragRotation] = useState<number | null>(null);
  const [dragAxis, setDragAxis] = useState<'x' | 'y' | null>(null);
  const [dragSign, setDragSign] = useState<1 | -1>(1);
  const [settling, setSettling] = useState(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (settling) return;
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
      if (!isFlipped) {
        setDragRotation(0);
        setDragAxis(null);
        setDragSign(1);
      }
    },
    [isFlipped, settling],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current || isFlipped) return;
      const t = e.touches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Lock axis and direction once (after ~10px movement)
      if (dragAxis === null && (absDx > 10 || absDy > 10)) {
        if (absDx > absDy) {
          setDragAxis('y');
          setDragSign(dx > 0 ? 1 : -1);
        } else {
          setDragAxis('x');
          setDragSign(dy > 0 ? -1 : 1);
        }
      }

      const distance = Math.max(absDx, absDy);
      setDragRotation(Math.min((distance / DRAG_RANGE) * 180, 180));
    },
    [isFlipped, dragAxis],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      touchStart.current = null;

      if (!isFlipped) {
        const distance = Math.max(absDx, absDy);
        if (distance >= FLIP_THRESHOLD && dragRotation !== null) {
          // Commit flip
          setSettling(true);
          setDragRotation(180);
          setTimeout(() => {
            setDragRotation(null);
            setDragAxis(null);
            setSettling(false);
            onFlip();
          }, SETTLE_MS);
        } else if (dragRotation !== null && dragRotation > 0) {
          // Spring back
          setSettling(true);
          setDragRotation(0);
          setTimeout(() => {
            setDragRotation(null);
            setDragAxis(null);
            setSettling(false);
          }, SETTLE_MS);
        } else {
          setDragRotation(null);
          setDragAxis(null);
        }
        return;
      }

      // Card revealed — swipe to navigate
      if (absDx < NAV_THRESHOLD && absDy < NAV_THRESHOLD) return;
      onSwipeNext();
    },
    [isFlipped, onFlip, onSwipeNext, dragRotation],
  );

  // Compute inline styles for the flip surface
  let flipTransform: string | undefined;
  let flipTransition: string | undefined;

  if (noTransition) {
    flipTransition = 'none';
  } else if (dragRotation !== null && dragAxis) {
    const signed = dragSign * dragRotation;
    flipTransform =
      dragAxis === 'y' ? `rotateY(${signed}deg)` : `rotateX(${signed}deg)`;
    flipTransition = settling
      ? 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none';
  } else if (isFlipped) {
    flipTransform = 'rotateY(180deg)';
    flipTransition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  const backFaceTransform = dragAxis === 'x' ? 'rotateX(180deg)' : 'rotateY(180deg)';
  const isDragging = dragRotation !== null;

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    flipStyle: {
      ...(flipTransform !== undefined && { transform: flipTransform }),
      ...(flipTransition !== undefined && { transition: flipTransition }),
    },
    backFaceTransform,
    isDragging,
  };
}
