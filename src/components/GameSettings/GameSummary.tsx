import type { CategoryName } from '../../types/game';
import { SETTINGS } from '../../copies';
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
  const items: SummaryItem[] = [
    { icon: <UsersIcon size={18} />, label: SETTINGS.SUMMARY_PLAYERS, value: playerCount },
    { icon: <FolderIcon size={18} />, label: SETTINGS.SUMMARY_CATEGORIES, value: selectedCategories.join(', ') },
    { icon: <UserSearchIcon size={18} />, label: SETTINGS.SUMMARY_IMPOSTERS, value: imposterCount },
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