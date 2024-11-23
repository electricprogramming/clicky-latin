/**
 * @param {String} hex 
 * @param {Number} amount 
 * @returns {String}
 */
export default function darkenColor(hex, amount = 30) {
  hex = hex.replace('#', '');
  // If the hex is 3 characters, expand it to 6 characters (e.g., "#abc" => "#aabbcc")
  if (hex.length === 3) {
    hex = hex.split('').map(x => x + x).join('');
  }
  // Parse the R, G, B components of the hex color
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  // Darken the color by reducing each RGB component by the given amount (ensure the value doesn't go below 0)
  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);
  // Convert the modified RGB components back to hex format
  const newHex = '#' + 
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0');
  return newHex;
}