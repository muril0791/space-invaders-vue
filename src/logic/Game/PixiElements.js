import * as PIXI from 'pixi.js';

export function createApp() {
  return new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
  });
}

export function createBackground() {
  const bgTexture = PIXI.Texture.from(require('@/assets/background.png'));
  return new PIXI.Sprite(bgTexture);
}

export function createShip() {
  const shipTexture = PIXI.Texture.from(require('@/assets/ship1.png'));
  const ship = new PIXI.Sprite(shipTexture);
  ship.anchor.set(0.5);
  ship.x = 400;
  ship.y = 550;
  return ship;
}

export function createEnemies(rows, enemiesPerRow) {
  const enemies = [];
  for (let row = 0; row < rows; row++) {
    enemies[row] = [];
    for (let col = 0; col < enemiesPerRow; col++) {
      const enemyTexture = PIXI.Texture.from(require('@/assets/ship_enemy.png'));
      let enemy = new PIXI.Sprite(enemyTexture);
      enemy.anchor.set(0.5);
      enemy.x = col * 100 + 100;
      enemy.y = row * 100 + 100;
      enemies[row][col] = enemy;
    }
  }
  return enemies;
}
