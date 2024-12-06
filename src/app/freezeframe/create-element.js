import getFontSize from '../../get-font-size.js';
import { clickSound, incorrectSound } from './sound-effects.js';
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
 * @param {string} word
 */
export default function createElement(language, matchId, word) {
  const isEnglish = (language === 'English');
  const parser = new DOMParser();
  const el = parser.parseFromString(isEnglish? englishBaseSvg : latinBaseSvg, "image/svg+xml").documentElement;
  const text = el.querySelector('.text');
  text.textContent = word;
  text.setAttribute('font-size', getFontSize(word));
  el.classList.add('game-element');
  el.setAttribute('lang', language);
  el.setAttribute('matchId', matchId);
  el.setAttribute('word', word);
  document.getElementById('game-container').appendChild(el);
  const elRect = el.getBoundingClientRect();
  const xPosition = Math.round(Math.random() * 100);
  const yPosition = Math.round(Math.random() * 100);
  if (xPosition <= 50) {
    el.style.left = `${xPosition}vw`;
  } else {
    el.style.right = `${100 - xPosition}vw`;
  }
  if (yPosition <= 50) {
    el.style.top = `${yPosition}vh`;
  } else {
    el.style.bottom = `${100 - yPosition}vh`;
  }
}