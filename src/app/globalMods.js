Array.shuffle = function(array) {
  let arr = [...array];
  for (let i = 0; i < 4; i++) {
    arr.reverse();
    arr.sort(() => Math.random() - 0.5);
  }
  return arr;
};
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
Object.prototype.forEach = function(callback) {
  Object.entries(this).forEach(([key, value]) => {
    callback(key, value);
  });
}
Array.prototype.includesAll = function(...items) {
  items.forEach((item) => {
    if (!this.includes(item)) return false;
  });
  return true;
}