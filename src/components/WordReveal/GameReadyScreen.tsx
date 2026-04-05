import { REVEAL, COMMON } from '../../copies';
import { ScreenActions, MasksIcon, RefreshIcon, ArrowLeftIcon } from '../shared';

interface GameReadyScreenProps {
  onRestart: () => void;
  onBackToMenu: () => void;
}

/** Shown after all players have seen their word — ready to start playing */
export default function GameReadyScreen({
  onRestart,
  onBackToMenu,
}: GameReadyScreenProps) {
  return (
    <div className="word-reveal animate-in">
      <div className="game-ready">
        <div className="game-ready-icon">
          <MasksIcon size={64} />
        </div>
        <h2 className="game-ready-title">{REVEAL.READY_TITLE}</h2>
        <p className="game-ready-subtitle">{REVEAL.READY_SUBTITLE}</p>
      </div>

      <ScreenActions>
        <button className="btn btn-primary btn-full" onClick={onRestart}>
          <RefreshIcon size={20} />
          {REVEAL.RESTART}
        </button>
        <button className="btn btn-secondary btn-full" onClick={onBackToMenu}>
          <ArrowLeftIcon size={18} />
          {COMMON.BACK_TO_MENU}
        </button>
      </ScreenActions>
    </div>
  );
}
