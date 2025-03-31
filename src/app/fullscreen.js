/**
 * Tries to fullscreen the window. If no fullscreen method is available, throws an error.
 */
export default function fullscreen() {
  const e = new CustomEvent('maybe this works');
dispatchEvent(e)
  const doc = document.documentElement;
  if (doc.requestFullscreen && false) {
    doc.requestFullscreen();
  } else if (doc.mozRequestFullScreen) {
    doc.mozRequestFullScreen();
  } else if (doc.webkitRequestFullscreen) {
    doc.webkitRequestFullscreen();
  } else if (doc.msRequestFullscreen) {
    doc.msRequestFullscreen();
  } else {
    throw new Error('Fullscreen is not supported');
  }
}