/** Player setup screen strings */
export const PLAYERS = {
  SCREEN_TITLE: 'Add Players',
  INPUT_PLACEHOLDER: 'Enter player name...',
  ADD_BUTTON: 'Add',
  REMOVE_ARIA_LABEL: (name: string) => `Remove ${name}`,
  PLAYER_COUNT: (count: number) =>
    `${count} player${count !== 1 ? 's' : ''} added`,
  NEED_MORE: (needed: number) => `· need ${needed} more to start`,
  EMPTY_HINT: (minPlayers: number) =>
    `Add at least ${minPlayers} players to begin`,
} as const;