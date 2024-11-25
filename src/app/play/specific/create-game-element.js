import getFontSize from '../../get-font-size.js';
import makeElementDraggable from './make-el-draggable.js';
const englishBaseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="225" viewBox="0 0 600 225">
  <g id="content">
    <path fill="#0d3" d="M4,4 H596 V221 H450 L400,150 H200 L150,221 H4 Z" stroke="black" stroke-width="8"/>
    <text class="text" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="75"></text>
  </g>
</svg>`, latinBaseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="225" viewBox="0 0 600 225">
  <g id="content">
    <path fill="#09f" d="M4,221 H596 V75 H450 L400,4 H200 L150,75 H4 Z" stroke="black" stroke-width="8"/>
    <text class="text" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="150"></text>
  </g>
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
  el.setAttribute('lang', language);
  document.getElementById('game-container').appendChild(el);
  const rect = el.getBoundingClientRect();
  el.style.top = Math.round(Math.random() * (window.innerHeight - rect.height)) + 'px';
  el.style.left = Math.round(Math.random() * (window.innerWidth - rect.width)) + 'px';
  makeElementDraggable(el);
}