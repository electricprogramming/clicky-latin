import getFontSize from '../get-font-size.js'
import getPositionForBlock from './get-position.js';
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

  const position = getPositionForBlock(word, index, isEnglish);
  if ('top' in position) el.style.top = position.top;
  if ('bottom' in position) el.style.bottom = position.bottom;
  if ('left' in position) el.style.left = position.left;
  if ('right' in position) el.style.right = position.right;
}