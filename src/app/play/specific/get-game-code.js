const gameCode = (window.location.href.match(new RegExp(`${''}(.*)`)) || [])[1]?.trim();
export default gameCode;