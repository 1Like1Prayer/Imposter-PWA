import type { CategoryName } from '../../types/game';
import { useTranslation } from 'react-i18next';
import { UsersIcon, FolderIcon, UserSearchIcon } from '../shared/Icons';
import type { ReactNode } from 'react';

interface SummaryItem {
  icon: ReactNode;
  label: string;
  value: string | number;
}

interface GameSummaryProps {
  playerCount: number;
  selectedCategories: CategoryName[];
  imposterCount: number;
}

/** Summary card showing players, categories, and imposter count */
export default function GameSummary({
  playerCount,
  selectedCategories,
  imposterCount,
}: GameSummaryProps) {
  const { t } = useTranslation();
  const items: SummaryItem[] = [
    { icon: <UsersIcon size={18} />, label: t('players'), value: playerCount },
    { icon: <FolderIcon size={18} />, label: t('categories'), value: selectedCategories.join(', ') },
    { icon: <UserSearchIcon size={18} />, label: t('imposters'), value: imposterCount },
  ];

  return (
    <div className="settings-summary">
      {items.map((item) => (
        <div className="summary-row" key={item.label}>
          <span className="summary-label">
            <span className="summary-icon">{item.icon}</span>
            {item.label}
          </span>
          <span className="summary-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
