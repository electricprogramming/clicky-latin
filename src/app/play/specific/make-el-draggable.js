/**
 * @param {HTMLElement} el
 */
export default function makeElementDraggable(el) {
  let isDragging = false;
  let offsetX, offsetY;
  // For desktop (mouse events)
  el.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
  });
  // For mobile (touch events)
  el.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - el.getBoundingClientRect().left;
    offsetY = touch.clientY - el.getBoundingClientRect().top;
  });
  // Common move handler for both mouse and touch
  const moveHandler = (e) => {
    if (isDragging) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const elementWidth = el.offsetWidth;
      const elementHeight = el.offsetHeight;
      console.log(`vw: ${viewportWidth}, vh: ${viewportHeight}, ew: ${elementWidth}, eh: ${elementHeight}`)
      // Determine the current position based on mouse or touch event
      let clientX = e.clientX || (e.touches && e.touches[0].clientX);
      let clientY = e.clientY || (e.touches && e.touches[0].clientY);
      let newLeft = clientX - offsetX;
      let newTop = clientY - offsetY;
      // fencing
      if (newLeft < 0) {
        newLeft = 0;
      }
      if (newTop < 0) {
        newTop = 0;
      }
      if (newLeft + elementWidth > viewportWidth) {
        newLeft = viewportWidth - elementWidth;
      }
      if (newTop + elementHeight > viewportHeight) {
        newTop = viewportHeight - elementHeight;
      }
      el.style.left = newLeft + "px";
      el.style.top = newTop + "px";
    }
  };
  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("touchmove", moveHandler);
  const stopDragging = () => {
    isDragging = false;
  };
  document.addEventListener("mouseup", stopDragging);
  document.addEventListener("touchend", stopDragging);
};