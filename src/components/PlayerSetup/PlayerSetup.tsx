import type { Player } from '../../types/game';
import { useTranslation } from 'react-i18next';
import { ScreenHeader, ScreenActions, ArrowRightIcon } from '../shared';
import PlayerInputForm from './PlayerInputForm';
import PlayerList from './PlayerList';
import './PlayerSetup.css';

const MIN_PLAYERS = 3;

interface PlayerSetupProps {
  players: Player[];
  onAddPlayer: (name: string) => boolean;
  onRemovePlayer: (playerId: string) => void;
  canContinue: boolean;
  onContinue: () => void;
  onBack: () => void;
}

export default function PlayerSetup({
  players,
  onAddPlayer,
  onRemovePlayer,
  canContinue,
  onContinue,
  onBack,
}: PlayerSetupProps) {
  const { t } = useTranslation();
  const playersNeeded = MIN_PLAYERS - players.length;

  return (
    <div className="player-setup animate-in">
      <ScreenHeader title={t('players.title')} onBack={onBack} />

      <PlayerInputForm onAddPlayer={onAddPlayer} />

      <p className="player-count">
        {t('players.count', { count: players.length })}
        {playersNeeded > 0 && (
          <span> {t('players.needMore', { needed: playersNeeded })}</span>
        )}
      </p>

      <PlayerList players={players} onRemovePlayer={onRemovePlayer} />

      <ScreenActions>
        <button
          className="btn btn-primary btn-full"
          disabled={!canContinue}
          onClick={onContinue}
        >
          {t('common.continue')}
          <ArrowRightIcon size={18} />
        </button>
      </ScreenActions>
    </div>
  );
}
