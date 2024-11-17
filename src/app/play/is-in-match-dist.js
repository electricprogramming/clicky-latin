import errorSize from './error-size.js';
export default function(a, b) {
  const pythagoras = (leg1, leg2) => {
    return Math.sqrt(leg1 * leg1 + leg2 * leg2);
  }
  const xDif = Math.abs(a.x - b.x);
  const yDif = Math.abs(a.y - b.y);
  const hypotenuse = pythagoras(xDif, yDif);
  const vmin = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
  const maxDist = (errorSize / 700) * vmin;
  return hypotenuse <= maxDist;
}