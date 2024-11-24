Array.shuffle = function(array) {
  let arr = [...array];
  for (let i = 0; i < 4; i++) {
    arr.reverse();
    arr.sort(() => Math.random() - 0.5);
  }
  return arr;
};
const ogArrayMap = Array.prototype.map;
Array.prototype.map = function(callback) {
  const map = ogArrayMap.bind(this);
  return map((item, idx, arr) => {
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