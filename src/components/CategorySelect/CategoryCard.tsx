import type { CategoryInfo } from '../../types/game';
import { useTranslation } from 'react-i18next';

interface CategoryCardProps {
  category: CategoryInfo;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: () => void;
}

/** Single category selection card with emoji, name, and description */
export default function CategoryCard({
  category,
  isSelected,
  isDisabled,
  onToggle,
}: CategoryCardProps) {
  const { t } = useTranslation();
  const className = [
    'category-card',
    isSelected && 'selected',
    isDisabled && 'disabled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      onClick={() => !isDisabled && onToggle()}
      disabled={isDisabled}
    >
      <span className="category-emoji">{category.emoji}</span>
      <span className="category-name">{t(`categories.${category.name.toLowerCase()}.name`)}</span>
      <span className="category-desc">{t(`categories.${category.name.toLowerCase()}.desc`)}</span>
    </button>
  );
}
