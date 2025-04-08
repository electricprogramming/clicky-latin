import getAsset from '../get-asset.js';
import getFontSize from '../get-font-size.js'
import getPositionForBlock from './get-position.js';
const englishBaseSvg = await getAsset('box-upper.svg'), latinBaseSvg = await getAsset('box-lower.svg');
/**
 * @param {('English' | 'Latin')} language
 * @param {string} word
 */
export default function createElement(language, matchId, word, index) {
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