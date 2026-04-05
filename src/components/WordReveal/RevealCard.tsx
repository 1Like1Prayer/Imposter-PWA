import { useTranslation } from 'react-i18next';
import type { GameRound } from '../../types/game';
import {
  TapIcon,
  UserSearchIcon,
  ShieldCheckIcon,
  SwipeIcon
} from '../shared/Icons';
import useCardFlipSwipe from '../../hooks/useCardFlipSwipe';

interface RevealCardProps {
  playerName: string;
  isFlipped: boolean;
  isImposter: boolean;
  gameRound: GameRound;
  noTransition?: boolean;
  slideIn?: boolean;
  onFlip: () => void;
  onSwipeNext: () => void;
  onSlideInEnd?: () => void;
}

export default function RevealCard({
  playerName,
  isFlipped,
  isImposter,
  gameRound,
  noTransition,
  slideIn,
  onFlip,
  onSwipeNext,
  onSlideInEnd
}: RevealCardProps) {
  const { t } = useTranslation();
  const {
    touchHandlers,
    flipStyle,
    isDragging,
    dismissStyle,
    backFaceTransform
  } = useCardFlipSwipe({ isFlipped, noTransition, onFlip, onSwipeNext });

  const containerClass = [
    'reveal-card-container',
    isFlipped && 'flipped',
    noTransition && 'no-transition',
    slideIn && 'slide-in'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClass}
      style={dismissStyle}
      onClick={!isFlipped && !isDragging ? onFlip : undefined}
      {...touchHandlers}
      onAnimationEnd={slideIn ? onSlideInEnd : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isFlipped) onFlip();
        }
      }}
      aria-label={
        isFlipped
          ? t('reveal.roleRevealed', { playerName })
          : t('reveal.tapToReveal')
      }
    >
      <div className="reveal-card-inner">
        <div className="reveal-card-flip" style={flipStyle}>
          {/* ===== FRONT FACE — tap / swipe to reveal ===== */}
          <div className="reveal-card-face reveal-card-front">
            <h2 className="reveal-card-name">{playerName}</h2>
            <span className="reveal-tap-icon">
              <TapIcon size={48} />
            </span>
            <span className="reveal-tap-hint">{t('reveal.tapHint')}</span>
            <p className="reveal-warning">{t('reveal.privacyWarning')}</p>
          </div>

          {/* ===== BACK FACE — revealed content ===== */}
          <div
            className={`reveal-card-face reveal-card-back ${
              isImposter ? 'is-imposter' : 'is-normal'
            }`}
            style={{ transform: backFaceTransform }}
          >
            <h2 className="reveal-card-name-back">{playerName}</h2>

            {isImposter ? (
              <>
                <span className="reveal-role-icon imposter-icon">
                  <UserSearchIcon size={40} />
                </span>
                <span className="reveal-role imposter">
                  {t('reveal.roleImposter')}
                </span>
                <span className="reveal-hint-label">
                  {t('reveal.hintLabel')}
                </span>
                <span className="reveal-hint">{gameRound.hint}</span>
              </>
            ) : (
              <>
                <span className="reveal-role-icon safe-icon">
                  <ShieldCheckIcon size={40} />
                </span>
                <span className="reveal-role normal">
                  {t('reveal.roleSafe')}
                </span>
                <span className="reveal-word">{gameRound.secretWord}</span>
              </>
            )}

            <div className="reveal-swipe-hint">
              <SwipeIcon size={20} />
              <span>{t('reveal.swipeHint')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
