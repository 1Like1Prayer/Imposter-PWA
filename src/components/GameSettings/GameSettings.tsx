import type { CategoryName, Player } from '../../types/game';
import { getMaxImposterCount } from '../../utils/gameLogic';
import { SETTINGS } from '../../copies';
import { ScreenHeader, ScreenActions, GamepadIcon } from '../shared';
import ImposterCounter from './ImposterCounter';
import GameSummary from './GameSummary';
import './GameSettings.css';

interface GameSettingsProps {
  players: Player[];
  selectedCategories: CategoryName[];
  imposterCount: number;
  defaultImposterCount: number;
  onChangeImposterCount: (count: number) => void;
  onStartGame: () => void;
  onBack: () => void;
}

export default function GameSettings({
  players,
  selectedCategories,
  imposterCount,
  defaultImposterCount,
  onChangeImposterCount,
  onStartGame,
  onBack,
}: GameSettingsProps) {
  const maxImposters = getMaxImposterCount(players.length);

  return (
    <div className="game-settings animate-in">
      <ScreenHeader title={SETTINGS.SCREEN_TITLE} onBack={onBack} />

      <ImposterCounter
        count={imposterCount}
        min={1}
        max={maxImposters}
        defaultCount={defaultImposterCount}
        playerCount={players.length}
        onChange={onChangeImposterCount}
      />

      <GameSummary
        playerCount={players.length}
        selectedCategories={selectedCategories}
        imposterCount={imposterCount}
      />

      <ScreenActions>
        <button className="btn btn-primary btn-full" onClick={onStartGame}>
          <GamepadIcon size={20} />
          {SETTINGS.START_GAME}
        </button>
      </ScreenActions>
    </div>
  );
}