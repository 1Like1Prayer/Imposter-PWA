import { REVEAL } from '../../copies';
import type { GameRound } from '../../types/game';
import { TapIcon, UserSearchIcon, ShieldCheckIcon, SwipeIcon } from '../shared/Icons';
import useCardFlipSwipe from '../../hooks/useCardFlipSwipe';

interface RevealCardProps {
  playerName: string;
  isFlipped: boolean;
  isImposter: boolean;
  gameRound: GameRound;
  noTransition?: boolean;
  onFlip: () => void;
  onSwipeNext: () => void;
}

export default function RevealCard({
  playerName,
  isFlipped,
  isImposter,
  gameRound,
  noTransition,
  onFlip,
  onSwipeNext,
}: RevealCardProps) {
  const { touchHandlers, flipStyle, backFaceTransform, isDragging } =
    useCardFlipSwipe({ isFlipped, noTransition, onFlip, onSwipeNext });

  const containerClass = [
    'reveal-card-container',
    isFlipped && 'flipped',
    noTransition && 'no-transition',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClass}
      onClick={!isFlipped && !isDragging ? onFlip : undefined}
      {...touchHandlers}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isFlipped) onFlip();
        }
      }}
      aria-label={isFlipped ? `${playerName}'s role revealed` : 'Tap to reveal your role'}
    >
      <div className="reveal-card-inner">
        <div className="reveal-card-flip" style={flipStyle}>
          {/* ===== FRONT FACE — tap / swipe to reveal ===== */}
          <div className="reveal-card-face reveal-card-front">
            <h2 className="reveal-card-name">{playerName}</h2>
            <span className="reveal-tap-icon">
              <TapIcon size={48} />
            </span>
            <span className="reveal-tap-hint">{REVEAL.TAP_HINT}</span>
            <p className="reveal-warning">{REVEAL.PRIVACY_WARNING}</p>
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
                <span className="reveal-role imposter">{REVEAL.ROLE_IMPOSTER}</span>
                <span className="reveal-hint-label">{REVEAL.HINT_LABEL}</span>
                <span className="reveal-hint">{gameRound.hint}</span>
              </>
            ) : (
              <>
                <span className="reveal-role-icon safe-icon">
                  <ShieldCheckIcon size={40} />
                </span>
                <span className="reveal-role normal">{REVEAL.ROLE_SAFE}</span>
                <span className="reveal-word">{gameRound.secretWord}</span>
              </>
            )}

            <div className="reveal-swipe-hint">
              <SwipeIcon size={20} />
              <span>{REVEAL.SWIPE_NEXT_HINT}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
