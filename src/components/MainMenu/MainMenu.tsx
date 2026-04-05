import { useTranslation } from 'react-i18next';
import { SpyIcon, PlayIcon, BookOpenIcon } from '../shared/Icons';
import './MainMenu.css';

interface MainMenuProps {
  onPlay: () => void;
  onRules: () => void;
}

export default function MainMenu({ onPlay, onRules }: MainMenuProps) {
  const { t } = useTranslation();
  return (
    <div className="main-menu animate-in">
      <div className="menu-content">
        <div className="menu-icon">
          <SpyIcon size={64} className="icon-hero-spy" />
        </div>
        <h1 className="menu-title">{t('imposter')}</h1>
        <p className="menu-subtitle">{t('findTheImposterAmongYou')}</p>

        <div className="menu-buttons">
          <button className="btn btn-primary btn-full" onClick={onPlay}>
            <PlayIcon size={20} />
            {t('play')}
          </button>
          <button className="btn btn-secondary btn-full" onClick={onRules}>
            <BookOpenIcon size={20} />
            {t('gameRules')}
          </button>
        </div>
      </div>
    </div>
  );
}
