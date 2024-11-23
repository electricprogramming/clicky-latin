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
      // Determine the current position based on mouse or touch event
      let clientX = e.clientX || (e.touches && e.touches[0].clientX);
      let clientY = e.clientY || (e.touches && e.touches[0].clientY);
      let newLeft = clientX - offsetX;
      let newTop = clientY - offsetY;
      // fencing
      const margin = 10;
      if (newLeft < margin) {
        newLeft = margin;
      }
      if (newTop < margin) {
        newTop = margin;
      }
      if (newLeft + elementWidth > viewportWidth - margin) {
        newLeft = viewportWidth - elementWidth - margin;
      }
      if (newTop + elementHeight > viewportHeight - margin) {
        newTop = viewportHeight - elementHeight - margin;
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