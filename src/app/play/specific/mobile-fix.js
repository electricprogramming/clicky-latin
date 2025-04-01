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
const $ = document.querySelector;
const thing = `${parseFloat(getComputedStyle($('svg')).width)},
${$('svg').getBoundingClientRect().width}`
fetch('https://data-logger.glitch.me', {method: 'POST', body: thing})