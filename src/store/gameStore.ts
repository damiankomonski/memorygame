import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

interface Tile {
  id: number;
  image: string;
  matched: boolean;
  flipped: boolean;
}

// Tworzymy funkcję `createGameStore`, która zwraca obiekt przechowujący stan gry
export const createGameStore = () => {
  const store = {
    tiles: [] as Tile[], // Lista kafelków (kart) w grze
    attempts: 0, // Liczba prób gracza
    startTime: null as number | null, // Czas rozpoczęcia gry
    endTime: null as number | null, // Czas zakończenia gry
    selectedTiles: [] as number[], // Indeksy obecnie wybranych kart
    gameOver: false, // Czy gra została ukończona?
    difficulty: 'medium' as 'easy' | 'medium' | 'hard', // Poziom trudności

    /**
     * Zmienia poziom trudności i restartuje grę.
     * @param level - Nowy poziom trudności ('easy', 'medium' lub 'hard')
     */
    setDifficulty(level: 'easy' | 'medium' | 'hard') {
      store.difficulty = level;
      store.resetGame();
    },

    /**
     * Odkrywa kartę o podanym ID.
     * Jeśli odkryto dwie karty, sprawdza czy są dopasowane.
     * Jeśli tak – oznacza je jako "matched".
     * Jeśli nie – po chwili je zakrywa.
     * Jeśli wszystkie karty są dopasowane, gra kończy się.
     * @param id - ID odkrywanej karty
     */
    revealTile(id: number) {
      if (store.selectedTiles.length === 2 || store.tiles[id].flipped || store.gameOver) return;

      // Odkrywamy kartę
      store.tiles[id].flipped = true;
      store.selectedTiles.push(id);

      // Jeśli wybrano dwie karty
      if (store.selectedTiles.length === 2) {
        const [first, second] = store.selectedTiles;
        if (store.tiles[first].image === store.tiles[second].image) {
          // Dopasowanie znalezione
          store.tiles[first].matched = true;
          store.tiles[second].matched = true;
        } else {
          // Jeśli nie pasują, zakrywamy je po sekundzie
          setTimeout(() => {
            store.tiles[first].flipped = false;
            store.tiles[second].flipped = false;
          }, 1000);
        }
        store.attempts++; // Zwiększamy licznik prób
        store.selectedTiles = [];

        // Sprawdzamy, czy wszystkie karty są już dopasowane
        if (store.tiles.every((tile) => tile.matched)) {
          store.endTime = Date.now(); // Ustawiamy czas zakończenia gry
          store.gameOver = true;
        }
      }
    },

    /**
     * Resetuje grę:
     * - Tworzy nową planszę kart na podstawie poziomu trudności.
     * - Zeruje licznik prób i czas.
     */
    resetGame() {
      const images = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍊', '🥭', '🍒', '🥝', '🍍'];
      const numPairs = store.difficulty === 'easy' ? 4 : store.difficulty === 'medium' ? 6 : 8;

      store.tiles = [...images.slice(0, numPairs), ...images.slice(0, numPairs)]
        .sort(() => Math.random() - 0.5) // Mieszamy karty losowo
        .map((image, index) => ({ id: index, image, matched: false, flipped: false }));

      store.attempts = 0;
      store.startTime = Date.now(); // Ustawiamy nowy czas startu
      store.endTime = null;
      store.selectedTiles = [];
      store.gameOver = false;
    },
  };

  makeAutoObservable(store); // MobX automatycznie obserwuje zmiany w stanie gry
  store.resetGame(); // Pierwsze uruchomienie gry
  return store;
};

// Tworzymy kontekst dla MobX Store, który możemy używać w komponentach
const GameContext = createContext(createGameStore());
export const useGameStore = () => useContext(GameContext);
