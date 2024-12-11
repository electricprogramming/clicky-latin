import getFontSize from '../get-font-size.js';
const container = document.getElementById('results-container');
/**
 * @param {number} gameId 
 * @param {string} gameName 
 */
export default function showSearchResult(gameId, gameName) {
  const elementContainer = document.createElement('div');
  function generateRandomUID() {
    const randomBuffer = new Uint8Array(20);
    window.crypto.getRandomValues(randomBuffer);
    return Array.from(randomBuffer, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  const elId = generateRandomUID();
  elementContainer.id = elId;
  const link = document.createElement('a');
  elementContainer.appendChild(link);
  elementContainer.classList.add('result-element');
  link.href = `/play/${gameId}`;
  container.appendChild(elementContainer);
  const iframe = document.createElement('iframe');
  iframe.src = `/freezeframe/${gameId}`;
  link.appendChild(iframe);
  const svgStr = `
    <svg xmlns="http://www.w3.org/2000/svg" width="80vw" height="80vh" style="user-select: none;">
      <rect width="100%" height="100%" fill="#0c6" stroke="white" stroke-width="2%"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Courier New">abc</text>
    </svg>
  `;
  const parser = new DOMParser();
  const svgEl = parser.parseFromString(svgStr, 'image/svg+xml').documentElement;
  link.appendChild(svgEl);
  const text = svgEl.querySelector('text');
  text.textContent = gameName;
  function resizeText() {
    if (document.getElementById(String(elId))) {
      const svgElSize = {
        width: svgEl.getBoundingClientRect().width,
        height: svgEl.getBoundingClientRect().height
      }
      text.setAttribute('font-size', getFontSize(gameName, svgElSize.height - (svgElSize.width / 50), svgElSize.width - (svgElSize.width / 50)));
    }
  }
  resizeText();
  window.addEventListener('resize', resizeText);
}