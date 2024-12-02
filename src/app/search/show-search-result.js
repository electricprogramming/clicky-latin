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
}