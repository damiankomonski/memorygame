import React from 'react';
import { observer } from 'mobx-react-lite';
import { useGameStore } from '../store/gameStore';

interface TileProps {
  id: number; // ID kafelka
  image: string; // Ikona emoji reprezentująca kartę
  flipped: boolean; // Czy karta jest obecnie odkryta?
  matched: boolean; // Czy karta została już dopasowana?
}

/**
 * Komponent pojedynczej karty (Tile).
 * Wyświetla kartę i reaguje na kliknięcie.
 */
const Tile: React.FC<TileProps> = observer(({ id, image, flipped, matched }) => {
  const gameStore = useGameStore();

  return (
    <button
      className={`tile ${flipped ? 'flipped' : ''} ${matched ? 'matched' : ''}`}
      onClick={() => gameStore.revealTile(id)} // Obsługa kliknięcia
      disabled={matched || flipped} // Blokujemy kliknięcie na dopasowanych/odkrytych kartach
    >
      {flipped || matched ? image : '❓'} {/* Pokazuje emoji lub znak zapytania */}
    </button>
  );
});

export default Tile;
