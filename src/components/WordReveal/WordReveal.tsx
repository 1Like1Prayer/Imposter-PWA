import { useState } from 'react';
import type { Player, GameRound } from '../../types/game';
import { REVEAL } from '../../copies';
import { ArrowRightIcon } from '../shared/Icons';
import RevealCard from './RevealCard';
import GameReadyScreen from './GameReadyScreen';
import './WordReveal.css';

interface WordRevealProps {
  players: Player[];
  gameRound: GameRound;
  onGameReady: () => void;
  onBackToMenu: () => void;
}

export default function WordReveal({
  players,
  gameRound,
  onGameReady,
  onBackToMenu,
}: WordRevealProps) {
  /** Index of the player whose turn it is to reveal */
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const currentPlayer = players[currentPlayerIndex];
  const isImposter = gameRound.imposterIds.includes(currentPlayer?.id);
  const isLastPlayer = currentPlayerIndex + 1 >= players.length;

  function handleTapToReveal() {
    setIsRevealed((prev) => !prev);
  }

  function handleNextPlayer() {
    setIsRevealed(false);
    if (isLastPlayer) {
      setAllDone(true);
    } else {
      setCurrentPlayerIndex((prev) => prev + 1);
    }
  }

  if (allDone) {
    return (
      <GameReadyScreen
        onGameReady={onGameReady}
        onBackToMenu={onBackToMenu}
      />
    );
  }

  return (
    <div className="word-reveal animate-in">
      <p className="reveal-progress">
        {REVEAL.PROGRESS(currentPlayerIndex + 1, players.length)}
      </p>

      <h2 className="reveal-player-name">{currentPlayer.name}</h2>

      <RevealCard
        playerName={currentPlayer.name}
        isRevealed={isRevealed}
        isImposter={isImposter}
        gameRound={gameRound}
        onTapToReveal={handleTapToReveal}
      />

      {isRevealed && (
        <div className="screen-actions animate-slide-up">
          <button className="btn btn-primary btn-full" onClick={handleNextPlayer}>
            {isLastPlayer ? REVEAL.ALL_SEEN : REVEAL.PASS_TO_NEXT}
            <ArrowRightIcon size={18} />
          </button>
        </div>
      )}
    </div>
  );
}