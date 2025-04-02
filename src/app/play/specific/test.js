/**
 * Adds two numbers or concatenates two strings depending on the arguments.
 * 
 * @overload
 * @param {number} a The first number.
 * @param {number} b The second number.
 * @returns {number} The sum of the two numbers.
 * 
 * @overload
 * @param {string} a The first string.
 * @param {string} b The second string.
 * @returns {string} The concatenation of the two strings.
 */
function add(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a + b;
  }
}
