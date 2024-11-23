import getLetterWidth from './get-letter-width.js';
/**
 * @param {String} txt 
 * @returns {Number}
 */
export default function getFontSize(txt) {
  const maxSize = 145;
  let size = maxSize;
  while (getLetterWidth(size) * txt.length >= 600) {
    size -= 2.5;
  }
  return size;
}