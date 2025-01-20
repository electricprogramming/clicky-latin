/**
 * @param {HTMLElement} el 
 * @param {function?} startDragFunc
 * @param {function?} endDragFunc
 */
export default function makeElementDraggable(el, startDragFunc, endDragFunc) {
  let isDragging = false;
  let offsetX, offsetY;
  // For desktop (mouse events)
  el.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    if (startDragFunc && typeof startDragFunc === 'function') {
      startDragFunc();
    }
  });
  // For mobile (touch events)
  el.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - el.getBoundingClientRect().left;
    offsetY = touch.clientY - el.getBoundingClientRect().top;
    if (startDragFunc && typeof startDragFunc === 'function') {
      startDragFunc();
    }
  });
  // Common move handler for both mouse and touch
  const moveHandler = (e) => {
    if (isDragging) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const elementWidth = el.getBoundingClientRect().width;
      const elementHeight = el.getBoundingClientRect().height;
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
      const newXPercent = newLeft / viewportWidth * 100;
      const newYPercent = newTop / viewportHeight * 100;
      if (newXPercent <= 50) {
        el.style.left = `${newXPercent}vw`;
      } else {
        el.style.right = `${100 - newXPercent}vw`; 
      }
      if (newYPercent <= 50) {
        el.style.top = `${newXPercent}vh`;
      } else {
        el.style.bottom = `${100 - newXPercent}vh`;
      }
    }
  };
  document.addEventListener('mousemove', moveHandler);
  document.addEventListener('touchmove', moveHandler);
  const stopDragging = () => {
    if (isDragging) {
      isDragging = false;
      if (endDragFunc && typeof endDragFunc === 'function') {
        endDragFunc();
      }
    }
  };
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchend', stopDragging);
};