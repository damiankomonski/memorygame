import React from 'react';
import { observer } from 'mobx-react-lite';
import { useGameStore } from '../store/gameStore';
import Tile from './Tile';
import '../styles/game.scss';

/**
 * Komponent planszy gry.
 * Generuje siatkę kart w zależności od poziomu trudności.
 */
const GameBoard: React.FC = observer(() => {
  const gameStore = useGameStore();
  
  // Ustawienie liczby kolumn w zależności od poziomu trudności
  const gridSize = gameStore.difficulty === 'easy' ? 4 : gameStore.difficulty === 'medium' ? 6 : 8;

  return (
    <div className="game-board" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
      {gameStore.tiles.map((tile) => (
        <Tile key={tile.id} {...tile} /> // Tworzenie kart
      ))}
    </div>
  );
});

export default GameBoard;
