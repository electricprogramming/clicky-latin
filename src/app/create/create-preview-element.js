import getFontSize from '../get-font-size.js';
import messages from '../messages.js';
const previewContainer = document.getElementById('preview-container');
const contextMenu = document.getElementById('context-menu');
const contextMenuRemoveOption = document.getElementById('context-menu-remove');
const baseSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375" viewBox="0 0 600 375">
    <path fill="#0d3" d="M0,0 H600 V225 H450 L400,150 H200 L150,225 H0 Z"/>
    <path fill="#09f" d="M0,375 H600 V225 H450 L400,150 H200 L150,225 H0 Z"/>
    <text class="text-english" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="75"></text>
    <text class="text-latin" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="300"></text>
</svg>`;
export default function createPreviewElement(englishWord, latinWord) {
  const parser = new DOMParser();
  const svgEl = parser.parseFromString(baseSVG, "image/svg+xml").documentElement;
  const englishText = svgEl.querySelector('.text-english');
  englishText.textContent = englishWord;
  englishText.setAttribute('font-size', getFontSize(englishWord));
  const latinText = svgEl.querySelector('.text-latin');
  latinText.textContent = latinWord;
  latinText.setAttribute('font-size', getFontSize(latinWord));
  svgEl.classList.add('preview-element');
  previewContainer.appendChild(svgEl);
  svgEl.addEventListener('contextmenu' /* right-click */, (e) => {
    e.preventDefault();
    contextMenu.style.top = `${e.pageY}px`;
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.display = 'block';
    contextMenuRemoveOption.addEventListener('click', () => {
      svgEl.remove();
      messages.broadcast('remove-pair', englishWord, latinWord);
    }, {once: true});
    document.addEventListener('click', () => {
      contextMenu.style.display = 'none';
    }, {once: true});
  });
};