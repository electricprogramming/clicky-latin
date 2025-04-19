let timers = [];
document.addEventListener('visibilitychange', () => {
  timers.filter(timer => !timer.ignore_window_change).forEach(timer => {
    if (document.hidden) timer.pause();
    else timer.start();
  });
});

class Timer {
  #startTime; #elapsed; #running; #ignore_window_change;
  constructor(options) {
    this.#startTime = 0;
    this.#elapsed = 0;
    this.#running = options?.start;
    if (options?.start) {
      this.#startTime = performance.now();
      this.start();
    }
    this.ignore_window_change = options?.ignore_window_change;
  }

  start() {
    if (!this.#running) {
      this.#startTime = performance.now() - this.#elapsed;
      this.#running = true;
    }
  }

  pause() {
    if (this.#running) {
      this.#elapsed = performance.now() - this.#startTime;
      this.#running = false;
    }
  }

  reset() {
    this.#elapsed = 0;
    this.#startTime = 0;
    this.#running = false;
  }

  get time() {
    if (this.#running) {
      return Math.round(performance.now() - this.#startTime);
    } else {
      return Math.round(this.#elapsed);
    }
  }

  set time(ms) {
    this.#elapsed = ms;
    if (this.#running) {
      this.#startTime = performance.now() - ms;
    }
  }

  get ignore_window_change() {
    return this.#ignore_window_change;
  }

  set ignore_window_change(val) {
    return this.#ignore_window_change = Boolean(val);
  }
}
export default Timer;