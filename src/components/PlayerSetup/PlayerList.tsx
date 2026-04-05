import type { Player } from '../../types/game';
import { useTranslation } from 'react-i18next';
import PlayerChip from './PlayerChip';

const MIN_PLAYERS = 3;

interface PlayerListProps {
  players: Player[];
  onRemovePlayer: (playerId: string) => void;
}

/** Scrollable list of added players, or empty-state hint */
export default function PlayerList({ players, onRemovePlayer }: PlayerListProps) {
  const { t } = useTranslation();
  return (
    <div className="player-list">
      {players.length === 0 && (
        <div className="min-players-hint">
          {t('addAtLeastMinplayersPlayersToBegin', { minPlayers: MIN_PLAYERS })}
        </div>
      )}

      {players.map((player, index) => (
        <PlayerChip
          key={player.id}
          index={index}
          name={player.name}
          onRemove={() => onRemovePlayer(player.id)}
        />
      ))}
    </div>
  );
}
