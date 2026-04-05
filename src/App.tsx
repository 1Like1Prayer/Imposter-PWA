import { useGameState } from './hooks/useGameState';
import MainMenu from './components/MainMenu';
import GameRules from './components/GameRules';
import PlayerSetup from './components/PlayerSetup';
import CategorySelect from './components/CategorySelect';
import GameSettings from './components/GameSettings';
import WordReveal from './components/WordReveal';

export default function App() {
  const game = useGameState();

  switch (game.screen) {
    case 'menu':
      return <MainMenu onPlay={game.goToPlayers} onRules={game.goToRules} />;

    case 'rules':
      return <GameRules onBack={game.goToMenu} />;

    case 'players':
      return (
        <PlayerSetup
          players={game.players}
          onAddPlayer={game.addPlayer}
          onRemovePlayer={game.removePlayer}
          canContinue={game.canContinueFromPlayers}
          onContinue={game.goToCategories}
          onBack={game.goToMenu}
        />
      );

    case 'categories':
      return (
        <CategorySelect
          selectedCategories={game.selectedCategories}
          onToggleCategory={game.toggleCategory}
          canContinue={game.canContinueFromCategories}
          onContinue={game.goToSettings}
          onBack={game.goBack}
        />
      );

    case 'settings':
      return (
        <GameSettings
          players={game.players}
          selectedCategories={game.selectedCategories}
          imposterCount={game.imposterCount}
          defaultImposterCount={game.defaultImposterCount}
          onChangeImposterCount={game.setImposterCount}
          onStartGame={game.startGame}
          onBack={game.goBack}
        />
      );

    case 'reveal':
      if (!game.gameRound) return null;
      return (
        <WordReveal
          key={game.roundKey}
          players={game.players}
          gameRound={game.gameRound}
          onRestart={game.restartRound}
          onBackToMenu={game.resetGame}
          onBackToSettings={game.goBack}
        />
      );

    default:
      return <MainMenu onPlay={game.goToPlayers} onRules={game.goToRules} />;
  }
}
