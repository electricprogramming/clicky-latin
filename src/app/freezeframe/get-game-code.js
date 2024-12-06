const url = new URL(window.location.href);
const gameCode = /\/freezeframe\/(.+)/.test(url)?
  url.pathname.replace('/freezeframe/', '') :
  url.searchParams.get('gameCode');
export default gameCode;