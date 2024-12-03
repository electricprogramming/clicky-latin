import getLetterWidth from './get-letter-width.js';
/**
 * 
 * @param {String} txt 
 * @param {Number} maxSize?
 * @param {Number} widthToFit?
 * @returns 
 */
export default function getFontSize(txt, maxSize = 140, widthToFit = 575) {
  let size = maxSize;
  while (getLetterWidth(size) * txt.length >= widthToFit) {
    size -= 1;
  }
  return size;
}