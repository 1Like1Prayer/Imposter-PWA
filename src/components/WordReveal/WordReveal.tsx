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
  onBackToSettings: () => void;
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
  onBackToSettings,
}: WordRevealProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const isTransitioning = useRef(false);

  const currentPlayer = players[currentPlayerIndex];
  const isImposter = gameRound.imposterIds.includes(currentPlayer?.id);
  const isLastPlayer = currentPlayerIndex + 1 >= players.length;

  const handleFlip = useCallback(() => {
    if (isTransitioning.current) return;
    haptic();
    setIsFlipped(true);
  }, []);

  const handleNextPlayer = useCallback(() => {
    if (isTransitioning.current) return;
    if (!isFlipped) return;
    isTransitioning.current = true;
    haptic(15);

    if (isLastPlayer) {
      setAllDone(true);
      isTransitioning.current = false;
      return;
    }

    setNoTransition(true);
    setIsFlipped(false);
    setCurrentPlayerIndex((prev) => prev + 1);
    setSlideIn(true);

    requestAnimationFrame(() => {
      setNoTransition(false);
      isTransitioning.current = false;
    });
  }, [isLastPlayer, isFlipped]);

  const handleSlideInEnd = useCallback(() => {
    setSlideIn(false);
  }, []);

  if (allDone) {
    return <GameReadyScreen onRestart={onRestart} onBackToMenu={onBackToMenu} />;
  }

  return (
    <div className="word-reveal animate-in">
      <button
        className="btn btn-ghost btn-icon reveal-back-btn"
        onClick={onBackToSettings}
        aria-label="Back to settings"
      >
        <ArrowLeftIcon size={24} />
      </button>

      <RevealCard
        playerName={currentPlayer.name}
        isFlipped={isFlipped}
        isImposter={isImposter}
        gameRound={gameRound}
        noTransition={noTransition}
        slideIn={slideIn}
        onFlip={handleFlip}
        onSwipeNext={handleNextPlayer}
        onSlideInEnd={handleSlideInEnd}
      />

      {/* Bottom nav — visible once card is flipped */}
      <div className={`reveal-actions${isFlipped ? ' visible' : ''}`}>
        <button className="btn btn-primary reveal-next-btn" onClick={handleNextPlayer}>
          {isLastPlayer ? REVEAL.ALL_SEEN : REVEAL.PASS_TO_NEXT}
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
