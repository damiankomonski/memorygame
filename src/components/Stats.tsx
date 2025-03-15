import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useGameStore } from '../store/gameStore';

/**
 * Komponent statystyk gry.
 * Wyświetla liczbę prób i dynamiczny licznik czasu.
 */
const Stats: React.FC = observer(() => {
  const gameStore = useGameStore();
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    // Funkcja aktualizująca licznik czasu
    const updateTimer = () => {
      if (gameStore.startTime) {
        if (gameStore.endTime) {
          setTimeElapsed((gameStore.endTime - gameStore.startTime) / 1000);
        } else {
          setTimeElapsed((Date.now() - gameStore.startTime) / 1000);
        }
      }
    };

    updateTimer(); // Ustawienie początkowego czasu
    const interval = setInterval(updateTimer, 10); // Aktualizacja co 10 ms

    return () => clearInterval(interval); // Czyszczenie licznika po odmontowaniu komponentu
  }, [gameStore.startTime, gameStore.endTime]);

  return (
    <div className="stats">
      <p>Próby: {gameStore.attempts}</p>
      <p>Czas: {timeElapsed.toFixed(2)}s</p> {/* Format czasu 0.00s */}
    </div>
  );
});

export default Stats;
