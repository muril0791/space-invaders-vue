// CollisionAndShooting.js
import * as PIXI from 'pixi.js';

export function fireBullet(ship) {
  const bulletTexture = PIXI.Texture.from(require('@/assets/shoting.png'));
  let bullet = new PIXI.Sprite(bulletTexture);
  bullet.anchor.set(0.5, 1);
  bullet.x = ship.x;
  bullet.y = ship.y;
  return bullet;
}

export function fireEnemyBullet(enemy) {
  const bulletTexture = PIXI.Texture.from(require('@/assets/shoting_enemy.png'));
  let bullet = new PIXI.Sprite(bulletTexture);
  bullet.anchor.set(0.5, 0);
  bullet.x = enemy.x;
  bullet.y = enemy.y;
  return bullet;
}

export function hitTestRectangle(r1, r2) {
    const left1 = r1.x - r1.width / 2;
    const left2 = r2.x - r2.width / 2;
    const right1 = r1.x + r1.width / 2;
    const right2 = r2.x + r2.width / 2;
    const top1 = r1.y - r1.height / 2;
    const top2 = r2.y - r2.height / 2;
    const bottom1 = r1.y + r1.height / 2;
    const bottom2 = r2.y + r2.height / 2;
  
    return !(left1 > right2 || right1 < left2 || top1 > bottom2 || bottom1 < top2);
}
  
export function checkCollisions(bullets, enemies, ship, enemyBullets, app) {
  bullets.forEach((bullet, bIndex) => {
    enemies.forEach((enemyRow, rowIndex) => {
      enemyRow.forEach((enemy, eIndex) => {
        if (hitTestRectangle(bullet, enemy)) {
          app.stage.removeChild(bullet);
          enemyRow[eIndex].parent.removeChild(enemyRow[eIndex]);
          bullets.splice(bIndex, 1);
          enemyRow.splice(eIndex, 1);
        }
      });
    });
  });
  
  enemyBullets.forEach((bullet, bIndex) => {
    if (hitTestRectangle(bullet, ship)) {
      app.stage.removeChild(bullet);
      enemyBullets.splice(bIndex, 1);
      ship.lives -= 1;
    }
  });
}
