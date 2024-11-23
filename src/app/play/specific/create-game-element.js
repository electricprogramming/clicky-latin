import getFontSize from '../../get-font-size.js';
import makeElementDraggable from './make-el-draggable.js';
const [englishBaseSvg, latinBaseSvg] = await new Promise(async (resolve, reject) => {
  const englishFetch = fetch('/assets/box-green.svg');
  const latinFetch = fetch('/assets/box-blue.svg');
  Promise.all([englishFetch, latinFetch])
    .then(([englishRes, latinRes]) => {
      return Promise.all([englishRes.text(), latinRes.text()]);
    })
    .then(([englishSvg, latinSvg]) => {
      resolve([englishSvg, latinSvg]);
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
});
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
  document.getElementById('game-container').appendChild(el);
  const rect = el.getBoundingClientRect();
  el.style.top = Math.round(Math.random() * (window.innerHeight - rect.height)) + 'px';
  el.style.left = Math.round(Math.random() * (window.innerWidth - rect.width)) + 'px';
  makeElementDraggable(el);
}