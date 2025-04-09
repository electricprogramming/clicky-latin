import isMobile from '../../is-mobile.js';

/**
 * More advanced version that works for desktop.
 * @param {HTMLElement} el 
 * @param {function?} startDragFunc
 * @param {function?} endDragFunc
 */
function _makeElDraggableDesktop(el, startDragFunc, endDragFunc) {
  let isDragging = false;
  let offsetX, offsetY;
  // For desktop (mouse events)
  el.addEventListener('mousedown', e => {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    el.style.zIndex = 99999;
    if (startDragFunc && typeof startDragFunc === 'function') {
      startDragFunc();
    }
  });
  // For mobile (touch events)
  el.addEventListener('touchstart', e => {
    e.preventDefault();
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.pageX - el.getBoundingClientRect().left;
    offsetY = touch.pageY - el.getBoundingClientRect().top;
    el.style.zIndex = 99999;
    if (startDragFunc && typeof startDragFunc === 'function') {
      startDragFunc();
    }
  });
  // Common move handler for both mouse and touch
  const moveHandler = function(e) {
    if (isDragging) {
      // Determine the current position based on mouse or touch event
      let clientX = e.clientX || e.touches?.[0]?.pageX;
      let clientY = e.clientY || e.touches?.[0]?.pageY;
      let newLeft = clientX - offsetX;
      let newTop = clientY - offsetY;
      let newRight = window.innerWidth - newLeft - el.getBoundingClientRect().width;
      let newBottom = window.innerHeight - newTop - el.getBoundingClientRect().height;

      // fencing
      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newRight < 0) newRight = 0;
      if (newBottom < 0) newBottom = 0;

      newLeft = newLeft / window.innerWidth * 100;
      newRight = newRight / window.innerWidth * 100;
      newTop = newTop / window.innerHeight * 100;
      newBottom = newBottom / window.innerHeight * 100;

      if (newLeft <= newRight) {
        el.style.right = '';
        el.style.left = `${newLeft}vw`;
      } else {
        el.style.left = '';
        el.style.right = `${newRight}vw`;
      }
      if (newTop <= newBottom) {
        el.style.bottom = '';
        el.style.top = `${newTop}vh`;
      } else {
        el.style.top = '';
        el.style.bottom = `${newBottom}vh`;
      }
    }
  };
  document.addEventListener('mousemove', moveHandler);
  document.addEventListener('touchmove', moveHandler);
  const stopDragging = function(e) {
    if (isDragging) {
      e.preventDefault();
      isDragging = false;
      el.style.zIndex = '';
      if (endDragFunc && typeof endDragFunc === 'function') {
        endDragFunc();
      }
    }
  }
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchend', stopDragging);
}

/**
 * More compatible version that works for mobile.
 * @param {HTMLElement} el 
 * @param {function?} startDragFunc
 * @param {function?} endDragFunc
 */
function _makeElDraggableMobile(el, startDragFunc, endDragFunc) {
  let isDragging = false;
  let offsetX, offsetY;

  let percentFromLeft = parseFloat(getComputedStyle(el).left) / window.innerWidth * 100;
  let percentFromTop = parseFloat(getComputedStyle(el).top) / window.innerHeight * 100;
  // For desktop (mouse events)
  el.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    el.style.zIndex = 99999;
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
    el.style.zIndex = 99999;
    if (startDragFunc && typeof startDragFunc === 'function') {
      startDragFunc();
    }
  });
  // Common move handler for both mouse and touch
  const moveHandler = (e) => {
    if (isDragging) {
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
      if (newLeft + elementWidth > window.innerWidth) {
        newLeft = window.innerWidth - elementWidth;
      }
      if (newTop + elementHeight > window.innerHeight) {
        newTop = window.innerHeight - elementHeight;
      }
      percentFromLeft = newLeft / window.innerWidth * 100;
      percentFromTop = newTop / window.innerHeight * 100;
      el.style.left = newLeft + 'px';
      el.style.top = newTop + 'px';
    }
  };
  document.addEventListener('mousemove', moveHandler);
  document.addEventListener('touchmove', moveHandler);
  const stopDragging = () => {
    if (isDragging) {
      isDragging = false;
      el.style.zIndex = '';
      if (endDragFunc && typeof endDragFunc === 'function') {
        endDragFunc();
      }
    }
  };
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchend', stopDragging);
  window.addEventListener('resize', (e) => {
    const elementWidth = el.getBoundingClientRect().width;
    const elementHeight = el.getBoundingClientRect().height;
    let left = percentFromLeft / 100 * window.innerWidth;
    let top = percentFromTop / 100 * window.innerHeight;
    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }
    if (left + elementWidth > window.innerWidth) {
      left = window.innerWidth - elementWidth;
    }
    if (top + elementHeight > window.innerHeight) {
      top = window.innerHeight - elementHeight;
    }
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  });
}
/**
 * Makes an element draggable using either mouse or touch.
 * @param {HTMLElement} el 
 * @param {function?} startDragFunc
 * @param {function?} endDragFunc
 */
export default function makeElementDraggable(el, startDragFunc, endDragFunc) {
  (isMobile() ? _makeElDraggableMobile : _makeElDraggableDesktop)(el, startDragFunc, endDragFunc);
}