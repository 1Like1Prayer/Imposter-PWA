/** Category selection screen strings */
export const CATEGORIES = {
  SCREEN_TITLE: 'Choose Categories',
  INSTRUCTION: (maxCategories: number) =>
    `Select up to ${maxCategories} categories for the word pool`,
  SELECTED_COUNT: (selected: number, max: number) =>
    `${selected} / ${max} selected`,

  /** Display info for each category (descriptions shown on the cards) */
  DESCRIPTIONS: {
    Food: 'Tasty dishes & ingredients',
    Hobbies: 'Fun things people do',
    Nature: 'The natural world',
    Characters: 'Disney, Legends, Heroes...',
    Jobs: 'Occupations & professions',
    Places: 'Locations around the world',
    Animals: 'Creatures big & small',
    Sports: 'Games & athletics',
  },
} as const;
