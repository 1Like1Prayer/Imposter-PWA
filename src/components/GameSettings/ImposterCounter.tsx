import { SETTINGS } from '../../copies';
import { PlusIcon, MinusIcon } from '../shared/Icons';

interface ImposterCounterProps {
  count: number;
  min: number;
  max: number;
  defaultCount: number;
  playerCount: number;
  onChange: (newCount: number) => void;
}

/** +/- stepper control for choosing the number of imposters */
export default function ImposterCounter({
  count,
  min,
  max,
  defaultCount,
  playerCount,
  onChange,
}: ImposterCounterProps) {
  return (
    <div className="settings-card">
      <p className="settings-label">{SETTINGS.IMPOSTER_LABEL}</p>

      <div className="imposter-control">
        <button
          className="imposter-btn"
          onClick={() => onChange(count - 1)}
          disabled={count <= min}
          aria-label="Decrease imposter count"
        >
          <MinusIcon size={20} />
        </button>

        <span className="imposter-count">{count}</span>

        <button
          className="imposter-btn"
          onClick={() => onChange(count + 1)}
          disabled={count >= max}
          aria-label="Increase imposter count"
        >
          <PlusIcon size={20} />
        </button>
      </div>

      <p className="settings-recommendation">
        {SETTINGS.RECOMMENDATION(defaultCount, playerCount)}
      </p>
    </div>
  );
}