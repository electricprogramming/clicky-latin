/**
 * Deterministically shuffles an array, seemingly randomly but not randomly.
 * @param {Array} arr 
 * @returns {Array}
 */
export default function deterministicShuffle(arr) {

  let seed = 0;
  for (let i = 0; i < arr.length; i++) {
    seed += arr[i].toString().charCodeAt(0) * (i + 1);
  }

  let shuffledArr = [...arr];
  for (let j = shuffledArr.length - 1; j > 0; j--) {
    const k = (seed + j) % (j + 1);
    [shuffledArr[j], shuffledArr[k]] = [shuffledArr[k], shuffledArr[j]];
  }
  
  return shuffledArr;
}