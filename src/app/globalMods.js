/**
 * @param {Array<any>} array 
 * @returns {Array}
 */
Array.shuffle = function(array) { 
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
/**
 * @param {Array<any>} array 
 * @returns {Array}
 */
Array.prototype.multiMap = function(callback) {
  return this.map((item, idx, arr) => {
    let returnedItems = [];
    const RETURN = function(...args) {
      returnedItems.push(...args);
    }
    callback(RETURN, item, idx, arr);
    return returnedItems;
  }).flat(1);
}
/**
 * @param {function} callback 
 */
Object.prototype.forEach = function(callback) {
  Object.entries(this).forEach(([key, value]) => {
    callback(key, value);
  });
}
/**
 * @param  {...any} items 
 * @returns {boolean}
 */
Array.prototype.includesAll = function(...items) {
  items.forEach((item) => {
    if (!this.includes(item)) return false;
  });
  return true;
}