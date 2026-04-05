import type { CategoryName, GameRound, Player } from '../types/game';
import WORD_LISTS, { type WordEntry } from '../data/wordLists';

/** Fisher-Yates shuffle - returns a new shuffled array */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Pick `count` random items from an array */
export function pickRandom<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}

/**
 * Compile a pool of 12 words from the selected categories.
 * - 1 category → 12 words
 * - 2 categories → 6 words each
 * - 3 categories → 4 words each
 */
export function compileWordPool(selectedCategories: CategoryName[]): WordEntry[] {
  const categoryCount = selectedCategories.length;
  const wordsPerCategory = Math.floor(12 / categoryCount);

  const pool: WordEntry[] = [];
  for (const category of selectedCategories) {
    const categoryWords = WORD_LISTS[category];
    const picked = pickRandom(categoryWords, wordsPerCategory);
    pool.push(...picked);
  }

  return shuffle(pool);
}

/** Calculate the default (recommended) number of imposters: 1 per 3 players */
export function getDefaultImposterCount(playerCount: number): number {
  return Math.max(1, Math.floor(playerCount / 3));
}

/** Maximum imposters allowed — at least 1 non-imposter must remain */
export function getMaxImposterCount(playerCount: number): number {
  return Math.max(1, playerCount - 1);
}

/** Build a complete GameRound: pick a secret word, assign imposters */
export function createGameRound(
  players: Player[],
  selectedCategories: CategoryName[],
  imposterCount: number,
): GameRound {
  const wordPool = compileWordPool(selectedCategories);

  // Pick a random entry as the secret word
  const secretEntry = wordPool[Math.floor(Math.random() * wordPool.length)];

  // Randomly choose imposters from the player list
  const shuffledPlayers = shuffle(players);
  const imposterIds = shuffledPlayers
    .slice(0, imposterCount)
    .map((player) => player.id);

  return {
    secretWord: secretEntry.word,
    hint: secretEntry.hint,
    imposterIds,
    wordPool: wordPool.map((entry) => entry.word),
  };
}

/** Generate a unique ID for players */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}
