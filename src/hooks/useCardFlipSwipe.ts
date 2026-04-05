import { useRef, useCallback, useState } from 'react';

/** Minimum drag distance (px) to commit the flip */
const FLIP_THRESHOLD = 60;
/** Drag distance that maps to a full 180° rotation */
const DRAG_RANGE = 200;
/** Minimum drag distance (px) to commit a dismiss */
const DISMISS_THRESHOLD = 80;
/** Drag distance that maps to full opacity fade */
const DISMISS_RANGE = 250;
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
  onSwipeNext
}: UseCardFlipSwipeOptions) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // --- Flip drag state (card not yet revealed, horizontal only → rotateY) ---
  const [dragRotation, setDragRotation] = useState<number | null>(null);
  const [dragSign, setDragSign] = useState<1 | -1>(1);
  const [settling, setSettling] = useState(false);

  // --- Dismiss drag state (card revealed, follows finger on both axes) ---
  const [dismissPos, setDismissPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [dismissSettling, setDismissSettling] = useState(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (settling || dismissSettling) return;
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
      if (!isFlipped) {
        setDragRotation(0);
        setDragSign(1);
      } else {
        setDismissPos({ x: 0, y: 0 });
      }
    },
    [isFlipped, settling, dismissSettling]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.touches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;

      if (!isFlipped) {
        // Horizontal flip drag only
        const absDx = Math.abs(dx);
        if (absDx > 10 && dragRotation === 0) {
          setDragSign(dx > 0 ? 1 : -1);
        }
        setDragRotation(Math.min((absDx / DRAG_RANGE) * 180, 180));
      } else {
        // Dismiss drag — follow finger on both axes
        setDismissPos({ x: dx, y: dy });
      }
    },
    [isFlipped, dragRotation]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      const absDx = Math.abs(dx);
      touchStart.current = null;

      if (!isFlipped) {
        if (absDx >= FLIP_THRESHOLD && dragRotation !== null) {
          setSettling(true);
          setDragRotation(180);
          setTimeout(() => {
            setDragRotation(null);
            setSettling(false);
            onFlip();
          }, SETTLE_MS);
        } else if (dragRotation !== null && dragRotation > 0) {
          setSettling(true);
          setDragRotation(0);
          setTimeout(() => {
            setDragRotation(null);
            setSettling(false);
          }, SETTLE_MS);
        } else {
          setDragRotation(null);
        }
        return;
      }

      // Dismiss gesture — use total distance from both axes
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance >= DISMISS_THRESHOLD) {
        // Fly off in the direction of the swipe
        const scale = window.innerWidth / Math.max(distance, 1);
        setDismissSettling(true);
        setDismissPos({ x: dx * scale, y: dy * scale });
        setTimeout(() => {
          setDismissPos(null);
          setDismissSettling(false);
          onSwipeNext();
        }, SETTLE_MS);
      } else if (
        dismissPos !== null &&
        (dismissPos.x !== 0 || dismissPos.y !== 0)
      ) {
        // Spring back
        setDismissSettling(true);
        setDismissPos({ x: 0, y: 0 });
        setTimeout(() => {
          setDismissPos(null);
          setDismissSettling(false);
        }, SETTLE_MS);
      } else {
        setDismissPos(null);
      }
    },
    [isFlipped, onFlip, onSwipeNext, dragRotation, dismissPos]
  );

  // --- Flip styles (horizontal only → rotateY) ---
  let flipTransform: string | undefined;
  let flipTransition: string | undefined;

  if (noTransition) {
    flipTransition = 'none';
  } else if (dragRotation !== null) {
    flipTransform = `rotateY(${dragSign * dragRotation}deg)`;
    flipTransition = settling
      ? 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none';
  } else if (isFlipped) {
    flipTransform = 'rotateY(180deg)';
    flipTransition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  const isDragging = dragRotation !== null;

  // --- Dismiss styles (follows finger on both axes) ---
  let dismissStyle: React.CSSProperties | undefined;
  if (dismissPos !== null) {
    const distance = Math.sqrt(dismissPos.x ** 2 + dismissPos.y ** 2);
    const progress = Math.min(distance / DISMISS_RANGE, 1);
    const opacity = 1 - progress * 0.6;
    dismissStyle = {
      transform: `translate(${dismissPos.x}px, ${dismissPos.y}px)`,
      opacity,
      transition: dismissSettling
        ? 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
        : 'none'
    };
  }

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    },
    flipStyle: {
      ...(flipTransform !== undefined && { transform: flipTransform }),
      ...(flipTransition !== undefined && { transition: flipTransition })
    },
    isDragging,
    dismissStyle,
    backFaceTransform: 'rotateY(180deg)'
  };
}
