Array.shuffle = function(array) {
  let arr = [...array];
  for (let i = 0; i < 4; i++) {
    arr.reverse();
    arr.sort(() => Math.random() - 0.5);
  }
  return arr;
};