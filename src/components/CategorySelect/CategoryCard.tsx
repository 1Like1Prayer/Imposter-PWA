import type { CategoryInfo } from '../../types/game';

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
      <span className="category-name">{category.name}</span>
      <span className="category-desc">{category.description}</span>
    </button>
  );
}
