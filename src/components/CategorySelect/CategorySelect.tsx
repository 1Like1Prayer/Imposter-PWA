import type { CategoryName } from '../../types/game';
import { getCategories } from '../../data/wordLists';
import { useTranslation } from 'react-i18next';
import { ScreenHeader, ScreenActions, ArrowRightIcon } from '../shared';
import CategoryCard from './CategoryCard';
import './CategorySelect.css';

const MAX_CATEGORIES = 3;

interface CategorySelectProps {
  selectedCategories: CategoryName[];
  onToggleCategory: (category: CategoryName) => void;
  canContinue: boolean;
  onContinue: () => void;
  onBack: () => void;
}

export default function CategorySelect({
  selectedCategories,
  onToggleCategory,
  canContinue,
  onContinue,
  onBack
}: CategorySelectProps) {
  const { t } = useTranslation();
  const isMaxSelected = selectedCategories.length >= MAX_CATEGORIES;

  return (
    <div className="category-select animate-in">
      <ScreenHeader title={t('categories.title')} onBack={onBack} />

      <div className="category-scrollable">
        <p className="category-instruction">
          {t('categories.instruction', { maxCategories: MAX_CATEGORIES })}
        </p>

        <div className="category-grid">
          {getCategories().map((category) => {
            const isSelected = selectedCategories.includes(category.name);
            const isDisabled = !isSelected && isMaxSelected;

            return (
              <CategoryCard
                key={category.name}
                category={category}
                isSelected={isSelected}
                isDisabled={isDisabled}
                onToggle={() => onToggleCategory(category.name)}
              />
            );
          })}
        </div>

        <p className="selected-count">
          {t('categories.selectedCount', {
            selected: selectedCategories.length,
            max: MAX_CATEGORIES
          })}
        </p>
      </div>

      <ScreenActions>
        <button
          className="btn btn-primary btn-full"
          disabled={!canContinue}
          onClick={onContinue}
        >
          {t('common.continue')}
          <ArrowRightIcon size={18} />
        </button>
      </ScreenActions>
    </div>
  );
}
