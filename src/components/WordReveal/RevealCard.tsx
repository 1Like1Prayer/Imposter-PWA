import { REVEAL } from '../../copies';
import type { GameRound } from '../../types/game';
import { TapIcon, UserSearchIcon, ShieldCheckIcon } from '../shared/Icons';

interface RevealCardProps {
  playerName: string;
  isRevealed: boolean;
  isImposter: boolean;
  gameRound: GameRound;
  onTapToReveal: () => void;
}

/** Card that starts hidden, reveals word/hint on tap */
export default function RevealCard({
  playerName,
  isRevealed,
  isImposter,
  gameRound,
  onTapToReveal,
}: RevealCardProps) {
  if (!isRevealed) {
    return (
      <div className="reveal-card" onClick={onTapToReveal} role="button" tabIndex={0}>
        <span className="reveal-tap-icon">
          <TapIcon size={48} />
        </span>
        <span className="reveal-tap-hint">{REVEAL.TAP_HINT}</span>
        <p className="reveal-warning">
          {REVEAL.PRIVACY_WARNING(playerName)}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`reveal-card revealed ${
        isImposter ? 'is-imposter' : 'is-normal'
      }`}
      onClick={onTapToReveal}
      role="button"
      tabIndex={0}
    >
      {isImposter ? (
        <>
          <span className="reveal-role-icon imposter-icon">
            <UserSearchIcon size={32} />
          </span>
          <span className="reveal-role imposter">{REVEAL.ROLE_IMPOSTER}</span>
          <span className="reveal-hint-label">{REVEAL.HINT_LABEL}</span>
          <span className="reveal-hint">{gameRound.hint}</span>
        </>
      ) : (
        <>
          <span className="reveal-role-icon safe-icon">
            <ShieldCheckIcon size={32} />
          </span>
          <span className="reveal-role normal">{REVEAL.ROLE_SAFE}</span>
          <span className="reveal-word">{gameRound.secretWord}</span>
        </>
      )}
    </div>
  );
}