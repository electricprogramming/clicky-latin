document.addEventListener('click', function(e) {
  if (e.target.classList.contains('toggle-switch')) {
    const toggleSwitch = e.target;
    toggleSwitch.classList.toggle('on');
    const toggleEvent = new CustomEvent('toggle');
    toggleEvent.toggleState = toggleSwitch.classList.contains('on');
    toggleSwitch.dispatchEvent(toggleEvent);
  }
});
const stylesheet = document.createElement('style');
stylesheet.textContent = `
.toggle-switch {
  position: relative;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.4s;
}
.toggle-switch:before {
  content: "";
  position: absolute;
  height: 80%;
  width: 80%;
  border-radius: 40%;
  left: 10%;
  top: 10%;
  background-color: white;
  transition: transform 0.4s;
}
.toggle-switch.on {
  background-color: #4CAF50;
}
.toggle-switch.on:before {
  transform: translateX(80%);
}
`
document.head.appendChild(stylesheet);