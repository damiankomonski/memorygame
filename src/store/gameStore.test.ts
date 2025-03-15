import { describe, it, expect, beforeEach } from 'vitest';
import { createGameStore } from './gameStore';

// Resetujemy stan gry przed każdym testem
let gameStore: ReturnType<typeof createGameStore>;

beforeEach(() => {
  gameStore = createGameStore();
});

describe('Game Store', () => {
  it('powinno poprawnie inicjalizować grę', () => {
    expect(gameStore.tiles.length).toBe(12); // Domyślnie 6 par
    expect(gameStore.attempts).toBe(0);
    expect(gameStore.startTime).toBeDefined();
    expect(gameStore.gameOver).toBe(false);
  });

  it('powinno odkrywać kartę', () => {
    gameStore.revealTile(0);
    expect(gameStore.tiles[0].flipped).toBe(true);
  });

  it('powinno resetować grę', () => {
    gameStore.resetGame();
    expect(gameStore.tiles.some((tile) => tile.flipped)).toBe(false);
    expect(gameStore.attempts).toBe(0);
    expect(gameStore.gameOver).toBe(false);
  });
});
