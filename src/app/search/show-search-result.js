import getFontSize from '../get-font-size.js';
const container = document.getElementById('results-container');
export default function showSearchResult(gameId, gameName) {
  const gameUrl = `https://clickylatin.vercel.app/play/${gameId}`;
  const elementContainer = document.createElement('div');
  const link = document.createElement('a');
  elementContainer.appendChild(link);
  elementContainer.classList.add('result-element');
  link.setAttribute('href', gameUrl);
  container.appendChild(elementContainer);
  const iframe = document.createElement('iframe');
  iframe.src = gameUrl;
  link.appendChild(iframe);
  const svgStr = `
    <svg width="80vw" height="80vh">
      <rect width="100%" height="100%" fill="lightblue" stroke="black" stroke-width="5%"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Courier New">abc</text>
    </svg>
  `;
  const parser = new DOMParser();
  const svgEl = parser.parseFromString(svgStr, 'image/svg+xml').documentElement;
  svgEl.style.userSelect = 'none';
  link.appendChild(svgEl);
  const svgElSize = {
    width: svgEl.getBoundingClientRect().width,
    height: svgEl.getBoundingClientRect().height
  }
  const text = svgEl.querySelector('text');
  text.textContent = gameName;
  text.setAttribute('font-size', getFontSize(gameName, svgElSize.height, svgElSize.width));
}