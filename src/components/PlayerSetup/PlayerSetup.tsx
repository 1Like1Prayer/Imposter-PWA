import type { Player } from '../../types/game';
import { PLAYERS, COMMON } from '../../copies';
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
  const playersNeeded = MIN_PLAYERS - players.length;

  return (
    <div className="player-setup animate-in">
      <ScreenHeader title={PLAYERS.SCREEN_TITLE} onBack={onBack} />

      <PlayerInputForm onAddPlayer={onAddPlayer} />

      <p className="player-count">
        {PLAYERS.PLAYER_COUNT(players.length)}
        {playersNeeded > 0 && (
          <span> {PLAYERS.NEED_MORE(playersNeeded)}</span>
        )}
      </p>

      <PlayerList players={players} onRemovePlayer={onRemovePlayer} />

      <ScreenActions>
        <button
          className="btn btn-primary btn-full"
          disabled={!canContinue}
          onClick={onContinue}
        >
          {COMMON.CONTINUE}
          <ArrowRightIcon size={18} />
        </button>
      </ScreenActions>
    </div>
  );
}