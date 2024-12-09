const timer = new (class {
  #time;
  constructor() {
    this.reset();
  }
  reset() {
    this.#time = Date.now();
  }
  get time() {
    return (Date.now() - this.#time);
  }
});
export default timer;