import errorSize from './error-size.js';
import pythagoras from './pythagoras.js';
export default function isInMatchDist(a, b) {
  const xDif = Math.abs(a.x - b.x);
  const yDif = Math.abs(a.y - b.y);
  const hypotenuse = pythagoras(xDif, yDif);
  const vmin = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
  const maxDist = (errorSize / 700) * vmin;
  return hypotenuse <= maxDist;
}