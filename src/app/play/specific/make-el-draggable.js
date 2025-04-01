/**
 * @param {HTMLElement} el 
 * @param {function?} startDragFunc
 * @param {function?} endDragFunc
 */
export default function makeElementDraggable(el, startDragFunc, endDragFunc) {
  let isDragging = false;
  let offsetX, offsetY;

  // Helper to get client coordinates
  function getClientCoordinates(e) {
    return e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };
  }

  // For desktop (mouse events)
  el.addEventListener("mousedown", e => {
    e.preventDefault();
    isDragging = true;
    const { x, y } = getClientCoordinates(e);
    offsetX = x - el.getBoundingClientRect().left;
    offsetY = y - el.getBoundingClientRect().top;
    if (startDragFunc && typeof startDragFunc === 'function') {
      startDragFunc();
    }
  });

  // For mobile (touch events)
  el.addEventListener("touchstart", e => {
    e.preventDefault();
    isDragging = true;
    const { x, y } = getClientCoordinates(e);
    offsetX = x - el.getBoundingClientRect().left;
    offsetY = y - el.getBoundingClientRect().top;
    if (startDragFunc && typeof startDragFunc === 'function') {
      startDragFunc();
    }
  });

  // Common move handler for both mouse and touch
  const moveHandler = function(e) {
    if (isDragging) {
      const elementWidth = el.getBoundingClientRect().width;
      const elementHeight = el.getBoundingClientRect().height;

      // Get coordinates (use client coordinates for both touch and mouse)
      const { x, y } = getClientCoordinates(e);

      let newLeft = x - offsetX;
      let newTop = y - offsetY;

      // Calculate boundaries based on the viewport
      const maxLeft = window.innerWidth - elementWidth;
      const maxTop = window.innerHeight - elementHeight;

      // Constrain within the viewport
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));

      // Convert to viewport units
      const newLeftVW = (newLeft / window.innerWidth) * 100;
      const newTopVH = (newTop / window.innerHeight) * 100;

      // Apply the left/right or top/bottom based on which side is closer
      if (newLeftVW <= 50) {
        el.style.left = `${newLeftVW}vw`;
        el.style.right = '';
      } else {
        el.style.right = `${100 - newLeftVW}vw`;
        el.style.left = '';
      }

      if (newTopVH <= 50) {
        el.style.top = `${newTopVH}vh`;
        el.style.bottom = '';
      } else {
        el.style.bottom = `${100 - newTopVH}vh`;
        el.style.top = '';
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
  };

  document.addEventListener("mouseup", stopDragging);
  document.addEventListener("touchend", stopDragging);
};
