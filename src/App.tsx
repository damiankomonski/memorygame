import React from 'react';
import { observer } from 'mobx-react-lite';
import GameBoard from './components/GameBoard';
import Stats from './components/Stats';
import DifficultySelector from './components/DifficultySelector';
import { useGameStore } from './store/gameStore';

/**
 * Główny komponent aplikacji.
 * Łączy wszystkie elementy gry: planszę, statystyki i wybór poziomu.
 */
const App: React.FC = observer(() => {
  const gameStore = useGameStore();

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <DifficultySelector />
      <Stats />
      <GameBoard />
      <button onClick={() => gameStore.resetGame()}>Restart</button> {/* Restart gry */}
    </div>
  );
});

export default App;
