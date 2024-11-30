const gameCode = new URL(window.location.href).pathname.replace('/play/', '');
export default gameCode;