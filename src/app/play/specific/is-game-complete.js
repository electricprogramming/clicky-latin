/**
 * Determines whether the user has completed the game.
 * @returns {boolean}
 */
export default function isGameCompleted() {
  return !document.querySelector('.game-element');
}