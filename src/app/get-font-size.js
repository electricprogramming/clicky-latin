export default function getFontSize(txt) {
  const maxSize = 170;
  let size = maxSize;
  while (getLetterWidth(size) * txt.length >= 600) {
    size -= 2.5;
  }
  return size;
}