import getFontSize from '/src/app/get-font-size.js';
const previewContainer = document.getElementById('preview-container');
const baseSVG = await fetch('/assets/box-all.svg');
export default function createPreviewElement(englishWord, latinWord) {
  const parser = new DOMParser();
  const svgEl = parser.parseFromString(baseSVG, "image/svg+xml").documentElement;
  const englishText = svgEl.querySelector('.text-english');
  englishText.textContent = englishWord;
  englishText.setAttribute('font-size', getFontSize(englishWord));
  const latinText = svgEl.querySelector('.text-latin');
  latinText.textContent = latinWord;
  latinText.setAttribute('font-size', getFontSize(latinWord));
  previewContainer.appendChild(svgEl);
};