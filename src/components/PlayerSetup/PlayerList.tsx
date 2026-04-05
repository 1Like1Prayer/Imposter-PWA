import type { Player } from '../../types/game';
import { PLAYERS } from '../../copies';
import PlayerChip from './PlayerChip';

const MIN_PLAYERS = 3;

interface PlayerListProps {
  players: Player[];
  onRemovePlayer: (playerId: string) => void;
}

/** Scrollable list of added players, or empty-state hint */
export default function PlayerList({ players, onRemovePlayer }: PlayerListProps) {
  return (
    <div className="player-list">
      {players.length === 0 && (
        <div className="min-players-hint">
          {PLAYERS.EMPTY_HINT(MIN_PLAYERS)}
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
