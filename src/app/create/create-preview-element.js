import getFontSize from '../get-font-size.js';
import messages from '../messages.js';
const previewContainer = document.getElementById('preview-container');
const contextMenu = document.getElementById('context-menu');
const contextMenuRemoveOption = document.getElementById('context-menu-remove');
const baseSVG = await (
  fetch('/assets/box-all.svg')
    .then(res => res.text())
);
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