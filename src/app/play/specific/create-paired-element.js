import getFontSize from '../../get-font-size.js';
import makeElementDraggable from './make-el-draggable.js';
const gameContainer = document.getElementById('game-container');
const baseSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 375">
  <g id="content">
    <path fill="#0d3" d="M4,4 H596 V225 H450 L400,150 H200 L150,225 H4 Z" stroke="black" stroke-width="8"/>
    <path fill="#09f" d="M4,371 H596 V225 H450 L400,150 H200 L150,225 H4 Z" stroke="black" stroke-width="8"/>
    <text class="text-english" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="75"></text>
    <text class="text-latin" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="300"></text>
  </g>
</svg>`;
export default function createPreviewElement(englishWord, latinWord, left, top) {
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
  el.style.left = left; el.style.top = top;
  makeElementDraggable(el);
  // In case the match goes off the edge
  {
    const viewportWidth = window.innerWidth, viewportHeight = window.innerHeight;
    const elementWidth = el.getBoundingClientRect().width, elementHeight = el.getBoundingClientRect().height;
    let left = parseFloat(el.style.left) || 0;
    let top = parseFloat(el.style.top) || 0;
    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }
    if (left + elementWidth > viewportWidth) {
      left = viewportWidth - elementWidth;
    }
    if (top + elementHeight > viewportHeight) {
      top = viewportHeight - elementHeight;
    }
    el.style.left = left + "px";
    el.style.top = top + "px";
  }
};