export function setupKeyListeners(onKeyDown, onKeyUp) {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }
  
  export function removeKeyListeners(onKeyDown, onKeyUp) {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
  }
  
  export function handleMovement(ship, keys) {
    if (keys['ArrowLeft'] || keys['KeyA']) ship.x -= 5;
    if (keys['ArrowRight'] || keys['KeyD']) ship.x += 5;
    if (keys['ArrowUp'] || keys['KeyW']) ship.y -= 5;
    if (keys['ArrowDown'] || keys['KeyS']) ship.y += 5;
  }
  