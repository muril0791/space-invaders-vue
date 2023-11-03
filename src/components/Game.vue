<template>
  <div id="game-container"></div>
</template>

<script>
import * as PIXI from 'pixi.js';
import { createApp, createBackground, createShip, createEnemies } from '@/logic/Game/PixiElements';
import { setupKeyListeners, removeKeyListeners, handleMovement } from '@/logic/Game/MovementAndKeys';
import { fireBullet, fireEnemyBullet, checkCollisions } from '@/logic/Game/CollisionAndShooting';

export default {
  data() {
    return {
      app: null,
      background: null,
      ship: null,
      enemies: [],
      bullets: [],
      enemyBullets: [],
      keys: {},
    };
  },
  mounted() {
    this.app = createApp();
    document.getElementById('game-container').appendChild(this.app.view);
    this.background = createBackground();
    this.ship = createShip();
    this.enemies = createEnemies(3, 6);
    this.app.stage.addChild(this.background);
    this.app.stage.addChild(this.ship);
    this.enemies.forEach(row => {
      row.forEach(enemy => {
        this.app.stage.addChild(enemy);
      });
    });
    setupKeyListeners(this.onKeyDown.bind(this), this.onKeyUp.bind(this));
    this.app.ticker.add(this.gameLoop.bind(this));
  },
  methods: {
    gameLoop() {
      handleMovement(this.ship, this.keys);
      this.bullets.forEach(bullet => {
        bullet.y -= 10;
        if (bullet.y < 0) {
          this.app.stage.removeChild(bullet);
          this.bullets.splice(this.bullets.indexOf(bullet), 1);
        }
      });
      this.enemyBullets.forEach(bullet => {
        bullet.y += 10;
        if (bullet.y > this.app.view.height) {
          this.app.stage.removeChild(bullet);
          this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);
        }
      });
      checkCollisions(this.bullets, this.enemies, this.ship, this.enemyBullets, this.app);
    },
    firePlayerBullet() {
      let bullet = fireBullet(this.ship);
      this.app.stage.addChild(bullet);
      this.bullets.push(bullet);
    },
    fireEnemyBullets() {
      this.enemies.forEach(row => {
        row.forEach(enemy => {
          let bullet = fireEnemyBullet(enemy);
          this.app.stage.addChild(bullet);
          this.enemyBullets.push(bullet);
        });
      });
    },
    onKeyDown(e) {
      this.keys[e.code] = true;
      if (e.code === 'Space') this.firePlayerBullet();
      if (e.code === 'KeyE') this.fireEnemyBullets();  // Pressionar 'E' para fazer os inimigos dispararem
    },
    onKeyUp(e) {
      this.keys[e.code] = false;
    },
  },
  beforeDestroy() {
    removeKeyListeners(this.onKeyDown.bind(this), this.onKeyUp.bind(this));
    this.app.ticker.remove(this.gameLoop.bind(this));
  },
};
</script>

<style scoped>
#game-container {
  margin: 0 auto;
  display: block;
}
</style>
