import { MENU } from '../../copies';
import { SpyIcon, PlayIcon, BookOpenIcon } from '../shared/Icons';
import './MainMenu.css';

interface MainMenuProps {
  onPlay: () => void;
  onRules: () => void;
}

export default function MainMenu({ onPlay, onRules }: MainMenuProps) {
  return (
    <div className="main-menu animate-in">
      <div className="menu-content">
        <div className="menu-icon">
          <SpyIcon size={64} className="icon-hero-spy" />
        </div>
        <h1 className="menu-title">{MENU.TITLE}</h1>
        <p className="menu-subtitle">{MENU.SUBTITLE}</p>

        <div className="menu-buttons">
          <button className="btn btn-primary btn-full" onClick={onPlay}>
            <PlayIcon size={20} />
            {MENU.PLAY_BUTTON}
          </button>
          <button className="btn btn-secondary btn-full" onClick={onRules}>
            <BookOpenIcon size={20} />
            {MENU.RULES_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
}