import React from 'react';
import { observer } from 'mobx-react-lite';
import { useGameStore } from '../store/gameStore';

/**
 * Komponent do wyboru poziomu trudności.
 * Umożliwia zmianę liczby kart w grze.
 */
const DifficultySelector: React.FC = observer(() => {
  const gameStore = useGameStore();

  return (
    <div className="difficulty-selector">
      <label>Poziom trudności: </label>
      <select value={gameStore.difficulty} onChange={(e) => gameStore.setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}>
        <option value="easy">Łatwy</option>
        <option value="medium">Średni</option>
        <option value="hard">Trudny</option>
      </select>
    </div>
  );
});

export default DifficultySelector;
