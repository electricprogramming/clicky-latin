import getLetterWidth from './get-letter-width.js';
/**
 * 
 * @param {string} txt 
 * @param {number} maxSize?
 * @param {number} widthToFit?
 * @returns 
 */
export default function getFontSize(txt, maxSize = 140, widthToFit = 575) {
  let size = maxSize;
  while (getLetterWidth(size) * txt.length >= widthToFit) {
    size -= 1;
  }
  return size;
}