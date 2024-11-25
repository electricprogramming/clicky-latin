import errorSize from './error-size.js';
import pythagoras from './pythagoras.js';
/**
 * 
 * @param {{x: Number y: Number}} a 
 * @param {{x: Number y: Number}} b 
 * @returns {Boolean}
 */
export default function isInMatchDist(English, Latin) {
  const boxHeight = Latin.el.getBoundingClientRect().height;
  Latin.y = Latin.y - boxHeight * 2/3;
  const xDif = Math.abs(English.x - Latin.x);
  const yDif = Math.abs(English.y - Latin.y);
  const hypotenuse = pythagoras(xDif, yDif);
  const vmin = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
  const maxDist = (errorSize / 700) * vmin;
  return hypotenuse <= maxDist;
}