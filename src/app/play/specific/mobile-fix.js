import fullscreen from '../../fullscreen.js';
import isMobile from '../../is-mobile.js';
if (isMobile()) {
  const gameContainer = document.getElementById('game-container');
  gameContainer.style.pointerEvents = 'none';
  document.addEventListener('touchstart', () => {
    fullscreen();
    gameContainer.style.pointerEvents = '';
  }, { once: true });
}
console.error = function(...data) {
  fetch('https://data-logger.glitch.me', {
    method: 'POST',
    body: 'ERROR' + JSON.stringify(data.map(data => data?.toString ? data.toString() : String(data)));
  });
}