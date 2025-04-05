import getFontSize from '../get-font-size.js';
/**
 * @param {number} gameId 
 * @param {string} gameName 
 */
export default function showSearchResult(gameId, gameName, resultIndex) {
  if (cachedIframes[gameId]) {
    cachedIframes[gameId].style.display = '';
    cachedIframes[gameId].style.order = resultIndex;
  } else {
    const container = document.createElement('div');
    const link = document.createElement('a');
    container.appendChild(link);
    container.classList.add('result-element');
    link.href = `/play/${gameId}`;
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
    document.getElementById('results-container').appendChild(container);
    container.style.order = resultIndex;
    function resizeText() {
      if (document.contains(container) && getComputedStyle(container).display !== 'none') {
        const svgElSize = {
          width: svgEl.getBoundingClientRect().width,
          height: svgEl.getBoundingClientRect().height
        }
        text.setAttribute('font-size', getFontSize(gameName, svgElSize.height - (svgElSize.width / 50), svgElSize.width - (svgElSize.width / 50)));
      }
    }
    resizeText();
    window.addEventListener('resize', resizeText);
    cachedIframes[gameId] = container;
  }
}