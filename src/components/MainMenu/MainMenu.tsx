import { useTranslation } from 'react-i18next';
import { SpyIcon, PlayIcon, BookOpenIcon } from '../shared/Icons';
import './MainMenu.css';

interface MainMenuProps {
  onPlay: () => void;
  onRules: () => void;
}

export default function MainMenu({ onPlay, onRules }: MainMenuProps) {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === 'he';
  const toggleLanguage = () => {
    i18n.changeLanguage(isHebrew ? 'en' : 'he');
  };

  return (
    <div className="main-menu animate-in">
      <button className="btn btn-ghost lang-toggle" onClick={toggleLanguage}>
        {isHebrew ? 'עב' : 'EN'}
      </button>
      <div className="menu-content">
        <div className="menu-icon">
          <SpyIcon size={64} className="icon-hero-spy" />
        </div>
        <h1 className="menu-title">{t('menu.title')}</h1>
        <p className="menu-subtitle">{t('menu.subtitle')}</p>

        <div className="menu-buttons">
          <button className="btn btn-primary btn-full" onClick={onPlay}>
            <PlayIcon size={20} />
            {t('menu.play')}
          </button>
          <button className="btn btn-secondary btn-full" onClick={onRules}>
            <BookOpenIcon size={20} />
            {t('rules.title')}
          </button>
        </div>
      </div>
    </div>
  );
}
