import getAsset from '../get-asset.js';
import getFontSize from '../get-font-size.js';
import messages from '../messages.js';
const previewContainer = document.getElementById('preview-container');
const contextMenu = document.getElementById('context-menu');
const contextMenuRemoveOption = document.getElementById('context-menu-remove');
const baseSVG = await getAsset('box-all.svg');
/**
 * @param {string} englishWord 
 * @param {string} latinWord 
 */
export default function createPreviewElement(englishWord, latinWord) {
  const parser = new DOMParser();
  const el = parser.parseFromString(baseSVG, "image/svg+xml").documentElement;
  const englishText = el.querySelector('.text-english');
  englishText.textContent = englishWord;
  englishText.setAttribute('font-size', getFontSize(englishWord));
  const latinText = el.querySelector('.text-latin');
  latinText.textContent = latinWord;
  latinText.setAttribute('font-size', getFontSize(latinWord));
  el.classList.add('preview-element');
  previewContainer.appendChild(el);
  el.addEventListener('contextmenu' /* right-click */, (e) => {
    e.preventDefault();
    contextMenu.style.top = `${e.pageY}px`;
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.display = 'block';
    contextMenuRemoveOption.addEventListener('click', () => {
      el.remove();
      messages.broadcast('remove-pair', englishWord, latinWord);
    }, {once: true});
    document.addEventListener('click', () => {
      contextMenu.style.display = 'none';
    }, {once: true});
  });
};