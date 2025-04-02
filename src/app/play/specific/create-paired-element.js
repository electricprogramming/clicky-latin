import getFontSize from '../../get-font-size.js';
import makeElementDraggable from './make-el-draggable.js';
import isMobile from '../../is-mobile.js';
const gameContainer = document.getElementById('game-container');
const baseSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 375">
  <g id="content">
    <path fill="#0d3" d="M4,4 H596 V225 H450 L400,150 H200 L150,225 H4 Z" stroke="black" stroke-width="8"/>
    <path fill="#09f" d="M4,371 H596 V225 H450 L400,150 H200 L150,225 H4 Z" stroke="black" stroke-width="8"/>
    <text class="text-english" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="75"></text>
    <text class="text-latin" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="300"></text>
  </g>
</svg>`;
/**
 * More advanced version that works for desktop.
 * @param {string} englishWord 
 * @param {string} latinWord
 * @param {object} position
 */
function _createPairedElementDesktop(englishWord, latinWord, position) {
  const parser = new DOMParser();
  const el = parser.parseFromString(baseSVG, "image/svg+xml").documentElement;
  const englishText = el.querySelector('.text-english');
  englishText.textContent = englishWord;
  englishText.setAttribute('font-size', getFontSize(englishWord));
  const latinText = el.querySelector('.text-latin');
  latinText.textContent = latinWord;
  latinText.setAttribute('font-size', getFontSize(latinWord));
  el.classList.add('paired-element');
  gameContainer.appendChild(el);
  if (position.top) el.style.top = `${position.top}vh`;
  if (position.bottom) el.style.bottom = `${position.bottom}vh`;
  if (position.left) el.style.left = `${position.left}vw`;
  if (position.right) el.style.right = `${position.right}vw`;

  makeElementDraggable(el);
}

/**
 * More compatible version that works for mobile.
 * @param {string} englishWord 
 * @param {string} latinWord 
 * @param {number} left 
 * @param {number} top 
 */
function _createPairedElementMobile(englishWord, latinWord, left, top) {
  const parser = new DOMParser();
  const el = parser.parseFromString(baseSVG, "image/svg+xml").documentElement;
  const englishText = el.querySelector('.text-english');
  englishText.textContent = englishWord;
  englishText.setAttribute('font-size', getFontSize(englishWord));
  const latinText = el.querySelector('.text-latin');
  latinText.textContent = latinWord;
  latinText.setAttribute('font-size', getFontSize(latinWord));
  el.classList.add('paired-element');
  gameContainer.appendChild(el);
  if (left < 0) {
    left = 0;
  }
  if (top < 0) {
    top = 0;
  }
  if (left + elementWidth > window.innerWidth) {
    left = window.innerWidth - elementWidth;
  }
  if (top + elementHeight > window.innerHeight) {
    top = window.innerHeight - elementHeight;
  }
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  makeElementDraggable(el);
  const elementWidth = el.getBoundingClientRect().width, elementHeight = el.getBoundingClientRect().height;
}

/**
 * Creates a paired element and appends to the page at a given position.
 * 
 * @overload
 * @param {string} englishWord
 * @param {string} latinWord
 * @param {object} position
 * 
 * @overload
 * @param {string} englishWord
 * @param {string} latinWord
 * @param {number} left
 * @param {number} top
 */
export default function createPairedElement(englishWord, latinWord, ...position) {
  (isMobile() ? _createPairedElementMobile : _createPairedElementDesktop)(englishWord, latinWord, ...position);
}