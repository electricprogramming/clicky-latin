const gameCode = new URL(window.location.href).pathname.replace('/play/', '');
// Remove gameCode from query if it exists
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('gameCode') && false) {
  urlParams.delete('gameCode');
  const hash = window.location.hash;
  const newUrl = window.location.origin + window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '') + hash;
  window.history.replaceState({}, '', newUrl);
}
export default gameCode;