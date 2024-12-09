/**
 * @param {Number} milliseconds 
 * @returns {{minutes: number, seconds: number}}
 */
export default function msToMinAndSec(milliseconds) {
  let totalSeconds = milliseconds / 1000;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Number((totalSeconds % 60).toFixed(4));
  return {minutes, seconds};
}