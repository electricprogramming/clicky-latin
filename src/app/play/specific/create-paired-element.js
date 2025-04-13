import getAsset from '../../get-asset.js';
import getFontSize from '../../get-font-size.js';
import makeElementDraggable from './make-el-draggable.js';
import isMobile from '../../is-mobile.js';
const pairedContainer = document.getElementById('paired-blocks');
const baseSVG = await getAsset('box-all.svg');
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
  pairedContainer.appendChild(el);

  if ('top' in position) el.style.top = `${position.top}vh`;
  if ('bottom' in position) el.style.bottom = `${position.bottom}vh`;
  if ('left' in position) el.style.left = `${position.left}vw`;
  if ('right' in position) el.style.right = `${position.right}vw`;

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
  const el = parser.parseFromString(baseSVG, 'image/svg+xml').documentElement;
  const englishText = el.querySelector('.text-english');
  englishText.textContent = englishWord;
  englishText.setAttribute('font-size', getFontSize(englishWord));
  const latinText = el.querySelector('.text-latin');
  latinText.textContent = latinWord;
  latinText.setAttribute('font-size', getFontSize(latinWord));
  el.classList.add('paired-element');
  pairedContainer.appendChild(el);

  const elementWidth = el.getBoundingClientRect().width, elementHeight = el.getBoundingClientRect().height;
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