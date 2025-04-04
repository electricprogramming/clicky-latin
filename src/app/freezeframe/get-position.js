/**
 * Creates a *seemingly* random position for a block based on its word and whether it is English or Latin.
 * @param {string} word
 * @param {boolean} isEnglish
 * @returns {object}
 */
export default function getPositionForBlock(word, index, isEnglish) {
  word = word.trim();
  
  let seedValue1 = 0;
  for (let i = 0; i < word.length; i += 2) {
    seedValue1 += word.charCodeAt(i)
  }
  seedValue1 += isEnglish ? 0 : 1;
  
  const xPosition = (seedValue1 * word.length * index * 55 / 7) % 50;
  
  let seedValue2 = 0;
  for (let i = 1; i < word.length; i += 2) {
    seedValue2 += word.charCodeAt(i)
  }
  seedValue2 += isEnglish ? 1 : 0;
  
  const yPosition = (seedValue1 * word.length * index * 63 / 11) % 50;
  const isLeft = seedValue1 % 2 === 0;
  const isTop = seedValue2 % 2 === 0;
  
  return {
    [isLeft ? 'left' : 'right']: `${xPosition}vw`, 
    [isTop ? 'top' : 'bottom']: `${yPosition}vh` 
  };
}