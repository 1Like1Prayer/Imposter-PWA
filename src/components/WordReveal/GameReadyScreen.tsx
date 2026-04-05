import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <div className="word-reveal animate-in">
      <div className="game-ready">
        <div className="game-ready-icon">
          <MasksIcon size={64} />
        </div>
        <h2 className="game-ready-title">{t('reveal.readyTitle')}</h2>
        <p className="game-ready-subtitle">{t('reveal.readySubtitle')}</p>
      </div>

      <ScreenActions>
        <button className="btn btn-primary btn-full" onClick={onRestart}>
          <RefreshIcon size={20} />
          {t('common.restart')}
        </button>
        <button className="btn btn-secondary btn-full" onClick={onBackToMenu}>
          <ArrowLeftIcon size={18} />
          {t('common.backToMenu')}
        </button>
      </ScreenActions>
    </div>
  );
}
