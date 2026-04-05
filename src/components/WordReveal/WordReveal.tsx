import { useState, useCallback, useRef } from 'react';
import type { Player, GameRound } from '../../types/game';
import { REVEAL } from '../../copies';
import { ArrowLeftIcon, ArrowRightIcon } from '../shared/Icons';
import RevealCard from './RevealCard';
import GameReadyScreen from './GameReadyScreen';
import './WordReveal.css';

interface WordRevealProps {
  players: Player[];
  gameRound: GameRound;
  onRestart: () => void;
  onBackToMenu: () => void;
}

/** Light haptic tap — a subtle vibration for touch feedback on supported devices */
function haptic(ms = 10) {
  navigator.vibrate?.(ms);
}

export default function WordReveal({
  players,
  gameRound,
  onRestart,
  onBackToMenu,
}: WordRevealProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  /** Whether the card is currently showing the revealed (back) face */
  const [isFlipped, setIsFlipped] = useState(false);
  const [allDone, setAllDone] = useState(false);
  /** Suppresses the flip CSS transition for one frame (instant reset) */
  const [noTransition, setNoTransition] = useState(false);
  /** Guard to prevent double-clicks during transition */
  const isTransitioning = useRef(false);

  const currentPlayer = players[currentPlayerIndex];
  const isImposter = gameRound.imposterIds.includes(currentPlayer?.id);
  const isLastPlayer = currentPlayerIndex + 1 >= players.length;
  const isFirstPlayer = currentPlayerIndex === 0;

  /** Flip the card (one-way: unrevealed → revealed only) */
  const handleFlip = useCallback(() => {
    if (isTransitioning.current) return;
    haptic();
    setIsFlipped(true);
  }, []);

  /** Advance to next player (or finish) */
  const handleNextPlayer = useCallback(() => {
    if (isTransitioning.current) return;
    if (!isFlipped) return; // card must be revealed first
    isTransitioning.current = true;
    haptic(15);

    if (isLastPlayer) {
      setAllDone(true);
      isTransitioning.current = false;
      return;
    }

    // Disable transition → reset card to front instantly → advance player
    setNoTransition(true);
    setIsFlipped(false);
    setCurrentPlayerIndex((prev) => prev + 1);

    requestAnimationFrame(() => {
      setNoTransition(false);
      isTransitioning.current = false;
    });
  }, [isLastPlayer, isFlipped]);

  /** Go back to previous player (re-shows their card already flipped) */
  const handlePrevPlayer = useCallback(() => {
    if (isTransitioning.current || isFirstPlayer) return;
    isTransitioning.current = true;
    haptic(15);

    setNoTransition(true);
    setIsFlipped(false);
    setCurrentPlayerIndex((prev) => prev - 1);

    requestAnimationFrame(() => {
      setNoTransition(false);
      isTransitioning.current = false;
    });
  }, [isFirstPlayer]);

  if (allDone) {
    return <GameReadyScreen onRestart={onRestart} onBackToMenu={onBackToMenu} />;
  }

  return (
    <div className="word-reveal animate-in">
      <RevealCard
        playerName={currentPlayer.name}
        isFlipped={isFlipped}
        isImposter={isImposter}
        gameRound={gameRound}
        noTransition={noTransition}
        onFlip={handleFlip}
        onSwipeNext={handleNextPlayer}
      />

      {/* Bottom nav — visible once card is flipped */}
      <div className={`reveal-actions${isFlipped ? ' visible' : ''}`}>
        <div className="reveal-nav-row">
          <button
            className="btn btn-secondary"
            onClick={handlePrevPlayer}
            disabled={isFirstPlayer}
            aria-label="Previous player"
          >
            <ArrowLeftIcon size={18} />
            {REVEAL.PASS_TO_PREV}
          </button>
          <button className="btn btn-primary" onClick={handleNextPlayer}>
            {isLastPlayer ? REVEAL.ALL_SEEN : REVEAL.PASS_TO_NEXT}
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
