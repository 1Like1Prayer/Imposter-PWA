import { PLAYERS } from '../../copies';
import { XIcon } from '../shared/Icons';

interface PlayerChipProps {
  index: number;
  name: string;
  onRemove: () => void;
}

/** Single player chip showing index, name, and remove button */
export default function PlayerChip({ index, name, onRemove }: PlayerChipProps) {
  return (
    <div className="player-chip">
      <div className="player-chip-index">{index + 1}</div>
      <span className="player-chip-name">{name}</span>
      <button
        className="player-chip-remove"
        onClick={onRemove}
        aria-label={PLAYERS.REMOVE_ARIA_LABEL(name)}
      >
        <XIcon size={16} />
      </button>
    </div>
  );
}