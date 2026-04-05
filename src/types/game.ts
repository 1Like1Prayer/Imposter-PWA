export type GameScreen =
  | 'menu'
  | 'rules'
  | 'players'
  | 'categories'
  | 'settings'
  | 'reveal'
  | 'gameplay';

export type CategoryName =
  | 'Food'
  | 'Hobbies'
  | 'Nature'
  | 'Characters'
  | 'Jobs'
  | 'Places'
  | 'Animals'
  | 'Sports';

export interface CategoryInfo {
  name: CategoryName;
  emoji: string;
  description: string;
}

export interface Player {
  id: string;
  name: string;
}

export interface GameConfig {
  players: Player[];
  selectedCategories: CategoryName[];
  imposterCount: number;
}

/** The compiled game round data after setup is complete */
export interface GameRound {
  secretWord: string;
  /** Hint shown to imposters instead of the word */
  hint: string;
  /** IDs of players who are imposters */
  imposterIds: string[];
  /** The 12 compiled words for the round (includes the secret word) */
  wordPool: string[];
}
