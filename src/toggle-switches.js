document.addEventListener('click', function(e) {
  if (e.target.classList.contains('toggle-switch')) {
    const toggleSwitch = e.target;
    toggleSwitch.classList.toggle('on');
    const toggleEvent = new CustomEvent('toggle');
    toggleEvent.toggleState = toggleSwitch.classList.contains('on');
    toggleSwitch.dispatchEvent(toggleEvent);
  }
});