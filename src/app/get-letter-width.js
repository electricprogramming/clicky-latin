function getLetterWidth(fontSize) {
  // Create a temporary canvas to measure text width
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  // Set the font to Courier New and the given font size
  context.font = `${fontSize}px "Courier New"`;
  // Return the width of the letter "M" (which is a good representation of the average width in monospace)
  return context.measureText('M').width;;
}

export default getLetterWidth;
