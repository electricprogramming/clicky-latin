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
const thing = `${parseFloat(getComputedStyle(document.querySelector('svg')).width)},
${document.querySelector('svg').getBoundingClientRect().width}`
fetch('https://data-logger.glitch.me', {method: 'POST', body: thing})