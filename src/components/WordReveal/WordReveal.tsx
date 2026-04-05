import { useState, useCallback, useRef } from 'react';
import type { Player, GameRound } from '../../types/game';
import { REVEAL } from '../../copies';
import { ArrowRightIcon } from '../shared/Icons';
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
  /** Index of the player whose turn it is to reveal */
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  /** Whether the card is currently showing the revealed (back) face */
  const [isFlipped, setIsFlipped] = useState(false);
  /** Whether the player has seen their role at least once (keeps button visible) */
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);
  const [allDone, setAllDone] = useState(false);
  /** Suppresses the flip CSS transition for one frame (instant reset) */
  const [noTransition, setNoTransition] = useState(false);
  /** Guard to prevent double-clicks during transition */
  const isTransitioning = useRef(false);

  const currentPlayer = players[currentPlayerIndex];
  const isImposter = gameRound.imposterIds.includes(currentPlayer?.id);
  const isLastPlayer = currentPlayerIndex + 1 >= players.length;

  /** Toggle the card flip; first tap also marks as "has been revealed" */
  const handleCardTap = useCallback(() => {
    if (isTransitioning.current) return;
    haptic();
    setIsFlipped((prev) => {
      if (!prev) setHasBeenRevealed(true);
      return !prev;
    });
  }, []);

  /** Hide button → instantly reset card → show next player */
  const handleNextPlayer = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    haptic(15);

    // Hide the button immediately
    setHasBeenRevealed(false);

    // Last player → go straight to game-ready
    if (isLastPlayer) {
      setAllDone(true);
      isTransitioning.current = false;
      return;
    }

    // Disable transition → reset card to front instantly → advance player
    setNoTransition(true);
    setIsFlipped(false);
    setCurrentPlayerIndex((prev) => prev + 1);

    // Re-enable transitions on the next frame so future flips animate
    requestAnimationFrame(() => {
      setNoTransition(false);
      isTransitioning.current = false;
    });
  }, [isLastPlayer]);

  if (allDone) {
    return (
      <GameReadyScreen
        onRestart={onRestart}
        onBackToMenu={onBackToMenu}
      />
    );
  }

  return (
    <div className="word-reveal animate-in">
      <RevealCard
        playerName={currentPlayer.name}
        isFlipped={isFlipped}
        isImposter={isImposter}
        gameRound={gameRound}
        noTransition={noTransition}
        onCardTap={handleCardTap}
      />

      {/* Always rendered to reserve space — visibility toggles to prevent layout shift */}
      <div className={`reveal-actions${hasBeenRevealed ? ' visible' : ''}`}>
        <button className="btn btn-primary btn-full" onClick={handleNextPlayer}>
          {isLastPlayer ? REVEAL.ALL_SEEN : REVEAL.PASS_TO_NEXT}
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
