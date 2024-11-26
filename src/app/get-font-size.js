import getLetterWidth from './get-letter-width.js';
/**
 * @param {String} txt 
 * @returns {Number}
 */
export default function getFontSize(txt) {
  const maxSize = 140;
  let size = maxSize;
  while (getLetterWidth(size) * txt.length >= 575) {
    size -= 1;
  }
  return size;
}