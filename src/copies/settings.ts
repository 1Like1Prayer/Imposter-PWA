/** Game settings screen strings */
export const SETTINGS = {
  SCREEN_TITLE: 'Game Settings',
  IMPOSTER_LABEL: 'Number of Imposters',
  RECOMMENDATION: (defaultCount: number, playerCount: number) =>
    `Recommended: ${defaultCount} imposter${defaultCount !== 1 ? 's' : ''} for ${playerCount} players`,
  SUMMARY_PLAYERS: 'Players',
  SUMMARY_CATEGORIES: 'Categories',
  SUMMARY_IMPOSTERS: 'Imposters',
  START_GAME: 'Start Game',
} as const;