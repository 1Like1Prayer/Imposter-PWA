import type { CategoryName } from '../../types/game';
import { CATEGORIES as CATEGORIES_DATA } from '../../data/wordLists';
import { CATEGORIES as CATEGORIES_COPY, COMMON } from '../../copies';
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
  onBack,
}: CategorySelectProps) {
  const isMaxSelected = selectedCategories.length >= MAX_CATEGORIES;

  return (
    <div className="category-select animate-in">
      <ScreenHeader title={CATEGORIES_COPY.SCREEN_TITLE} onBack={onBack} />

      <p className="category-instruction">
        {CATEGORIES_COPY.INSTRUCTION(MAX_CATEGORIES)}
      </p>

      <div className="category-grid">
        {CATEGORIES_DATA.map((category) => {
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
        {CATEGORIES_COPY.SELECTED_COUNT(selectedCategories.length, MAX_CATEGORIES)}
      </p>

      <ScreenActions>
        <button
          className="btn btn-primary btn-full"
          disabled={!canContinue}
          onClick={onContinue}
        >
          {COMMON.CONTINUE}
          <ArrowRightIcon size={18} />
        </button>
      </ScreenActions>
    </div>
  );
}