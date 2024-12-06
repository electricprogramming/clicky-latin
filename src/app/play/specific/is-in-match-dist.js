import errorSize from './error-size.js';
import pythagoras from './pythagoras.js';
/**
 * @param {{x: number, y: number}} English
 * @param {{x: number, y: number}} Latin
 * @returns {boolean}
 */
export default function isInMatchDist(English, Latin) {
  const boxHeight = English.el.getBoundingClientRect().height;
  Latin.y = Latin.y - boxHeight * 2/3;
  const xDif = Math.abs(English.x - Latin.x);
  const yDif = Math.abs(English.y - Latin.y);
  const hypotenuse = pythagoras(xDif, yDif);
  const vmin = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
  const maxDist = (errorSize / 700) * vmin;
  return hypotenuse <= maxDist;
}