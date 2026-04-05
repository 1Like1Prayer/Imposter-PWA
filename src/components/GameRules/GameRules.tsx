import { useTranslation } from 'react-i18next';
import { ScreenHeader, ScreenActions, ArrowLeftIcon } from '../shared';
import RuleItem from './RuleItem';
import './GameRules.css';

const RULE_KEYS = [
  'rules.step1',
  'rules.step2',
  'rules.step3',
  'rules.step4',
  'rules.step5',
  'rules.step6',
  'rules.step7',
] as const;

interface GameRulesProps {
  onBack: () => void;
}

export default function GameRules({ onBack }: GameRulesProps) {
  const { t } = useTranslation();
  return (
    <div className="game-rules animate-in">
      <ScreenHeader title={t('rules.title')} onBack={onBack} />

      <div className="rules-list">
        {RULE_KEYS.map((key, index) => (
          <RuleItem key={key} stepNumber={index + 1} text={t(key)} />
        ))}
      </div>

      <ScreenActions>
        <button className="btn btn-secondary btn-full" onClick={onBack}>
          <ArrowLeftIcon size={18} />
          {t('common.backToMenu')}
        </button>
      </ScreenActions>
    </div>
  );
}
