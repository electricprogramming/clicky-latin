const gameCode = (window.location.href.match(new RegExp(`${'clickylatin.vercel.app/play/'}(.*)`)) || [])[1]?.trim();
export default gameCode;