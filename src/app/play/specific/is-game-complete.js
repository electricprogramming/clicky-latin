/**
 * @returns {boolean}
 */
export default function isGameCompleted() {
  if (document.querySelector('.game-element')) return false;
  else return true;
}