const container = document.getElementById('results-container');
export default function showSearchResult(gameId, gameName) {
  const gameUrl = `https://clickylatin.vercel.app/play/${gameId}`
  const link = document.createElement('a');
  link.classList.add('result-element');
  link.setAttribute('href', gameUrl);
  container.appendChild(link);
  const iframe = document.createElement('iframe');
  iframe.src = gameUrl;
  link.appendChild(iframe);
}