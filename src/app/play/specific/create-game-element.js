import getFontSize from '../../get-font-size.js';
import makeElementDraggable from './make-el-draggable.js';
const englishBaseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="225" viewBox="0 0 600 225">
<path fill="#0d3" d="M0,0 H600 V225 H450 L400,150 H200 L150,225 H0 Z"/>
<text class="text" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="75"></text>
</svg>`,
latinBaseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="225" viewBox="0 0 600 225">
<path fill="#09f" d="M0,225 H600 V75 H450 L400,0 H200 L150,75 H0 Z"/>
<text class="text" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="150"></text>
</svg>`;
/**
 * @param {('English' | 'Latin')} language
 * @param {String} word
 */
export default function createGameElement(language, word) {
  const parser = new DOMParser();
  const el = parser.parseFromString(language === 'English'? englishBaseSvg : latinBaseSvg, "image/svg+xml").documentElement;
  const text = el.querySelector('.text');
  text.textContent = word;
  text.setAttribute('font-size', getFontSize(word));
  el.classList.add('game-element');
  el.style.top = Math.round(Math.random() * (window.innerHeight - el.offsetHeight)) + 'px';
  el.style.left = Math.round(Math.random() * (window.innerWidth - el.offsetWidth)) + 'px';
  makeElementDraggable(el);
  document.getElementById('game-containerw').appendChild(el);
}