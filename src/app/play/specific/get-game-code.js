const url = new URL(window.location.href);
const gameCode = /\/play\/(.+)/.test(url)? url.pathname.replace('/play/', '') : url.searchParams.get('gameCode');
export default gameCode;