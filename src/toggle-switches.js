document.addEventListener('click', function(e) {
  if (e.target.classList.contains('toggle-switch')) {
    const toggleSwitch = e.target;
    toggleSwitch.classList.toggle('on');
    const toggleEvent = new CustomEvent('toggle');
    toggleEvent.toggleState = toggleSwitch.classList.contains('on');
    toggleSwitch.dispatchEvent(toggleEvent);
  }
});
setTimeout(() => {
  const newSwitch = document.createElement('div');
  newSwitch.classList.add('toggle-switch');
  document.body.appendChild(newSwitch);
}, 2000);
const stylesheet = document.createElement('style');
stylesheet.textContent = `
.toggle-switch {
  position: relative;
  width: 9vmin;
  height: 5vmin;
  background-color: #ccc;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.4s;
}
.toggle-switch:before {
  content: "";
  position: absolute;
  height: 4vmin;
  width: 4vmin;
  border-radius: 50px;
  left: 0.5vmin;
  top: 0.5vmin;
  background-color: white;
  transition: transform 0.4s;
}
.toggle-switch.on {
  background-color: #4CAF50;
}
.toggle-switch.on:before {
  transform: translateX(4vmin);
}
`
document.head.appendChild(stylesheet);