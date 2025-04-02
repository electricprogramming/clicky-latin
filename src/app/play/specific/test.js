/**
 * Combines a string with a number, or adds two numbers.
 * This function has two different behaviors based on the arguments provided.
 * 
 * @overload
 * @param {string} str The string to combine.
 * @param {number} num The number to append to the string.
 * @returns {string} The string with the number appended.
 * @description
 * This version of the function takes a string and a number as arguments.
 * It concatenates the number to the string and returns the result.
 * 
 * @overload
 * @param {number} a The first number.
 * @param {number} b The second number.
 * @returns {number} The sum of the two numbers.
 * @description
 * This version of the function takes two numbers as arguments.
 * It adds the numbers together and returns the sum.
 */
function combine(a, b) {
  if (typeof a === 'string' && typeof b === 'number') {
    return a + b;
  } else if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }
}