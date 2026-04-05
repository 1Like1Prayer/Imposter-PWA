import { useState, useCallback } from 'react';
import type { GameScreen, CategoryName, Player, GameRound, GameConfig } from '../types/game';
import { generateId, getDefaultImposterCount, createGameRound } from '../utils/gameLogic';

const MIN_PLAYERS = 3;
const MAX_CATEGORIES = 3;

export function useGameState() {
  const [screen, setScreen] = useState<GameScreen>('menu');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryName[]>([]);
  const [imposterCount, setImposterCount] = useState(1);
  const [gameRound, setGameRound] = useState<GameRound | null>(null);
  const [roundKey, setRoundKey] = useState(0);

  // -- Player management --

  const addPlayer = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return false;

    setPlayers((prev) => [...prev, { id: generateId(), name: trimmed }]);
    return true;
  }, []);

  const removePlayer = useCallback((playerId: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== playerId));
  }, []);

  const canContinueFromPlayers = players.length >= MIN_PLAYERS;

  // -- Category management --

  const toggleCategory = useCallback((category: CategoryName) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      if (prev.length >= MAX_CATEGORIES) return prev;
      return [...prev, category];
    });
  }, []);

  const canContinueFromCategories = selectedCategories.length >= 1;

  // -- Settings --

  const defaultImposterCount = getDefaultImposterCount(players.length);

  // -- Navigation --

  const goToPlayers = useCallback(() => setScreen('players'), []);
  const goToRules = useCallback(() => setScreen('rules'), []);
  const goToCategories = useCallback(() => {
    setScreen('categories');
  }, []);

  const goToSettings = useCallback(() => {
    setImposterCount(defaultImposterCount);
    setScreen('settings');
  }, [defaultImposterCount]);

  const goToMenu = useCallback(() => {
    setScreen('menu');
  }, []);

  const goBack = useCallback(() => {
    const backMap: Partial<Record<GameScreen, GameScreen>> = {
      rules: 'menu',
      players: 'menu',
      categories: 'players',
      settings: 'categories',
      reveal: 'settings',
    };
    const target = backMap[screen] ?? 'menu';
    setScreen(target);
  }, [screen]);

  // -- Start the game --

  const startGame = useCallback(() => {
    const round = createGameRound(players, selectedCategories, imposterCount);
    setGameRound(round);
    setRoundKey((k) => k + 1);
    setScreen('reveal');
  }, [players, selectedCategories, imposterCount]);

  // -- Reset everything --

  const resetGame = useCallback(() => {
    setPlayers([]);
    setSelectedCategories([]);
    setImposterCount(1);
    setGameRound(null);
    setScreen('menu');
  }, []);

  // -- Restart round: keep players & categories, re-roll word/imposter --

  const restartRound = useCallback(() => {
    const round = createGameRound(players, selectedCategories, imposterCount);
    setGameRound(round);
    setRoundKey((k) => k + 1);
    setScreen('reveal');
  }, [players, selectedCategories, imposterCount]);

  const gameConfig: GameConfig = {
    players,
    selectedCategories,
    imposterCount,
  };

  return {
    screen,
    gameConfig,
    gameRound,
    roundKey,
    players,
    selectedCategories,
    imposterCount,
    canContinueFromPlayers,
    canContinueFromCategories,
    defaultImposterCount,

    // Actions
    addPlayer,
    removePlayer,
    toggleCategory,
    setImposterCount,
    goToMenu,
    goToPlayers,
    goToRules,
    goToCategories,
    goToSettings,
    goBack,
    startGame,
    resetGame,
    restartRound,
  };
}
