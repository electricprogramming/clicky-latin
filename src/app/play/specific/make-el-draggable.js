/**
 * @param {HTMLElement} el 
 * @param {function?} startDragFunc
 * @param {function?} endDragFunc
 */
export default function makeElementDraggable(el, startDragFunc, endDragFunc) {
  let isDragging = false;
  let offsetX, offsetY;

  // For desktop (mouse events)
  el.addEventListener("mousedown", e => {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    if (startDragFunc && typeof startDragFunc === 'function') {
      startDragFunc();
    }
  });

  // For mobile (touch events)
  el.addEventListener("touchstart", e => {
    e.preventDefault();
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.pageX - el.getBoundingClientRect().left;
    offsetY = touch.pageY - el.getBoundingClientRect().top;
    if (startDragFunc && typeof startDragFunc === 'function') {
      startDragFunc();
    }
  });

  // Common move handler for both mouse and touch
  const moveHandler = function(e) {
    if (isDragging) {
      const elementWidth = el.getBoundingClientRect().width;
      const elementHeight = el.getBoundingClientRect().height;

      let clientX = e.clientX || e.touches?.[0]?.pageX;
      let clientY = e.clientY || e.touches?.[0]?.pageY;

      let newLeft = clientX - offsetX;
      let newTop = clientY - offsetY;

      let newRight = window.innerWidth - newLeft - elementWidth;
      let newBottom = window.innerHeight - newTop - elementHeight;

      // Apply fencing to ensure the element stays within the viewport
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - elementWidth));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - elementHeight));
      
      // Convert to viewport units
      const newLeftVW = (newLeft / window.innerWidth) * 100;
      const newRightVW = (newRight / window.innerWidth) * 100;
      const newTopVH = (newTop / window.innerHeight) * 100;
      const newBottomVH = (newBottom / window.innerHeight) * 100;

      // Determine which side is closer for horizontal position
      if (newLeftVW <= newRightVW) {
        el.style.left = `${newLeftVW}vw`;
        el.style.right = '';
      } else {
        el.style.right = `${newRightVW}vw`;
        el.style.left = '';
      }

      // Determine which side is closer for vertical position
      if (newTopVH <= newBottomVH) {
        el.style.top = `${newTopVH}vh`;
        el.style.bottom = '';
      } else {
        el.style.bottom = `${newBottomVH}vh`;
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
