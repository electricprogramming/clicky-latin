/**
 * @param {HTMLElement} el 
 * @param {function?} startDragFunc
 * @param {function?} endDragFunc
 */
export default function makeElementDraggable(el, startDragFunc, endDragFunc) {
  let isDragging = false;
  let offsetX, offsetY;
  // For desktop (mouse events)
  el.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    if (startDragFunc && typeof startDragFunc === 'function') {
      startDragFunc();
    }
  });
  // For mobile (touch events)
  el.addEventListener("touchstart", (e) => {
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
  const moveHandler = function(e) {
    if (isDragging) {
      e.preventDefault();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const elementWidth = el.getBoundingClientRect().width;
      const elementHeight = el.getBoundingClientRect().height;
      // Determine the current position based on mouse or touch event
      let clientX = e.clientX || e.touches?.[0]?.clientX;
      let clientY = e.clientY || e.touches?.[0]?.clientY;
      let newLeft = clientX - offsetX;
      let newTop = clientY - offsetY;
      let newRight = window.innerWidth - newLeft - elementWidth;
      let newBottom = window.innerHeight - newTop - elementHeight;
      
      // fencing
      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newRight < 0) newRight = 0;
      if (newBottom < 0) newBottom = 0;

      newLeft = newLeft / window.innerWidth * 100;
      newRight = newRight / window.innerWidth * 100;
      newTop = newTop / window.innerHeight * 100;
      newBottom = newBottom / window.innerHeight * 100;

      if (newLeft >= newRight) {
        el.style.right = '';
        el.style.left = `${newLeft}vw`;
      } else {
        el.style.left = '';
        el.style.right = `${newRight}vw`;
      }
      if (newTop >= newBottom) {
        el.style.bottom = '';
        el.style.top = `${newTop}vh`;
      } else {
        el.style.top = '';
        el.style.bottom = `${newBottom}vh`;
      }
    }
  };
  document.addEventListener("mousemove", moveHandler);
  document.addEventListener("touchmove", moveHandler);
  const stopDragging = function(e) {
    if (isDragging) {
      e.preventDefault();
      isDragging = false;
      if (endDragFunc && typeof endDragFunc === 'function') {
        endDragFunc();
      }
    }
  }
  document.addEventListener("mouseup", stopDragging);
  document.addEventListener("touchend", stopDragging);
  /*window.addEventListener('resize', () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const elementWidth = el.getBoundingClientRect().width;
    const elementHeight = el.getBoundingClientRect().height;
    let left = parseFloat(el.style.left) || 0;
    let top = parseFloat(el.style.top) || 0;
    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }
    if (left + elementWidth > viewportWidth) {
      left = viewportWidth - elementWidth;
    }
    if (top + elementHeight > viewportHeight) {
      top = viewportHeight - elementHeight;
    }
    el.style.left = left + "px";
    el.style.top = top + "px";
  });*/
};
