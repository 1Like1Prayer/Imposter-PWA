import type { CategoryName, Player } from '../../types/game';
import { getMaxImposterCount } from '../../utils/gameLogic';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const maxImposters = getMaxImposterCount(players.length);

  return (
    <div className="game-settings animate-in">
      <ScreenHeader title={t('gameSettings')} onBack={onBack} />

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
          {t('startGame')}
        </button>
      </ScreenActions>
    </div>
  );
}
