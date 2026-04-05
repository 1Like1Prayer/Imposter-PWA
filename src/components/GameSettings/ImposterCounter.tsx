import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <div className="settings-card">
      <p className="settings-label">{t('numberOfImposters')}</p>

      <div className="imposter-control">
        <button
          className="imposter-btn"
          onClick={() => onChange(count - 1)}
          disabled={count <= min}
          aria-label={t('decreaseImposterCount')}
        >
          <MinusIcon size={20} />
        </button>

        <span className="imposter-count">{count}</span>

        <button
          className="imposter-btn"
          onClick={() => onChange(count + 1)}
          disabled={count >= max}
          aria-label={t('increaseImposterCount')}
        >
          <PlusIcon size={20} />
        </button>
      </div>

      <p className="settings-recommendation">
        {t('recommendedDefaultcountImpostervalForPlayercountPlayers', {
          defaultCount,
          val: defaultCount !== 1 ? 's' : '',
          playerCount,
        })}
      </p>
    </div>
  );
}
