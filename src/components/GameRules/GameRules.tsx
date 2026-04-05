import { RULES, COMMON } from '../../copies';
import { ScreenHeader, ScreenActions, ArrowLeftIcon } from '../shared';
import RuleItem from './RuleItem';
import './GameRules.css';

interface GameRulesProps {
  onBack: () => void;
}

export default function GameRules({ onBack }: GameRulesProps) {
  return (
    <div className="game-rules animate-in">
      <ScreenHeader title={RULES.SCREEN_TITLE} onBack={onBack} />

      <div className="rules-list">
        {RULES.STEPS.map((text, index) => (
          <RuleItem key={index} stepNumber={index + 1} text={text} />
        ))}
      </div>

      <ScreenActions>
        <button className="btn btn-secondary btn-full" onClick={onBack}>
          <ArrowLeftIcon size={18} />
          {COMMON.BACK_TO_MENU}
        </button>
      </ScreenActions>
    </div>
  );
}