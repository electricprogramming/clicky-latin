import {
  isChristmas, isEaster, isThanksgiving,
  isHalloween, isAprilFools, isJuly4th,
  isValentines, isMay4th } from './days.js';

/**
 * Sets the value of a CSS variable to a given value.
 * @param {string} name
 * @pattern ^([a-zA-Z_])([a-zA-Z0-9_-]*)$
 * 
 * @param {string} value 
 */
function setCssVar(name, value) {
  if (typeof name === 'string' && /^([a-zA-Z_])([a-zA-Z0-9_-]*)$/.test(name)) {
    document.documentElement.style.setProperty(`--${name}`, value);
  }
}

window.setCssVar = setCssVar;

if (isChristmas()) {
  setCssVar('background', '#002');
  setCssVar('main-ui', '#ccc');
  setCssVar('box-upper', '#d11');
  setCssVar('box-lower', '#0a2');
  setCssVar('foreground-1', '#d11');
  setCssVar('foreground-2', '#0a2');
  setCssVar('main-text', '#d11');
  setCssVar('minor-text', '#0a3');
  setCssVar('bright-text', '#fff');
  setCssVar('accent-1', '#082');
  setCssVar('accent-2', '#d11');
} else if (isEaster()) {
  setCssVar('background', '#0b3');
  setCssVar('main-ui', '#555');
  setCssVar('box-upper', '#f9b');
  setCssVar('box-lower', '#ff4');
  setCssVar('foreground-1', '#f9b');
  setCssVar('foreground-2', '#ff4');
  setCssVar('main-text', '#ff2');
  setCssVar('minor-text', '#fff');
  setCssVar('bright-text', '#fff');
  setCssVar('accent-1', '#f79');
  setCssVar('accent-2', '#ff4');
} else if (isThanksgiving()) {
  setCssVar('background', '#8b1');
  setCssVar('main-ui', '#fd4');
  setCssVar('box-upper', '#fa0');
  setCssVar('box-lower', '#b23');
  setCssVar('foreground-1', '#fa0');
  setCssVar('foreground-2', '#b23');
  setCssVar('main-text', '#c11');
  setCssVar('minor-text', '#c20');
  setCssVar('bright-text', '#c20');
  setCssVar('accent-1', '#fa0');
  setCssVar('accent-2', '#b23');
} else if (isHalloween()) {
  setCssVar('background', '#000');
  setCssVar('main-ui', '#555');
  setCssVar('box-upper', '#f80');
  setCssVar('box-lower', '#ee1');
  setCssVar('foreground-1', '#f80');
  setCssVar('foreground-2', '#ee1');
  setCssVar('main-text', '#e50');
  setCssVar('minor-text', '#ee1');
  setCssVar('bright-text', '#ee1');
  setCssVar('accent-1', '#c0d');
  setCssVar('accent-2', '#f80');
} else if (isAprilFools()) {
  setCssVar('background', '#fff');
  setCssVar('main-ui', '#ccc');
  setCssVar('box-upper', '#0001');
  setCssVar('box-lower', '#0001');
  setCssVar('foreground-1', '#eee');
  setCssVar('foreground-2', '#eee');
  setCssVar('main-text', '#000');
  setCssVar('minor-text', '#000');
  setCssVar('bright-text', '#fff');
  setCssVar('accent-1', '#888');
  setCssVar('accent-2', '#000');
} else if (isJuly4th()) {
  setCssVar('background', '#fff');
  setCssVar('main-ui', '#ddd');
  setCssVar('box-upper', '#f00');
  setCssVar('box-lower', '#00f');
  setCssVar('foreground-1', '#f00');
  setCssVar('foreground-2', '#00f');
  setCssVar('main-text', '#f00');
  setCssVar('minor-text', '#00f');
  setCssVar('bright-text', '#00f');
  setCssVar('accent-1', '#00f');
  setCssVar('accent-2', '#f00');
} else if (isValentines()) {
  setCssVar('background', '#fdd');
  setCssVar('main-ui', '#fbc');
  setCssVar('box-upper', '#f00');
  setCssVar('box-lower', '#f8a');
  setCssVar('foreground-1', '#f00');
  setCssVar('foreground-2', '#f8a');
  setCssVar('main-text', '#f01');
  setCssVar('minor-text', '#f36');
  setCssVar('bright-text', '#f36');
  setCssVar('accent-1', '#f8a');
  setCssVar('accent-2', '#f02');
} else if (isMay4th()) {
  // Star Wars theme
  setCssVar('background', '#000');
  setCssVar('main-ui', '#333')
  setCssVar('main-text', '#f8e71b');
  setCssVar('minor-text', '#f8e71b');
  setCssVar('bright-text', '#f8e71b');
  setCssVar('accent-1', '#f8e71b');
  setCssVar('accent-2', '#f00');
  const upperGradientDef = `
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0f0; stop-opacity:1" />
        <stop offset="16.7%" style="stop-color:#9f9; stop-opacity:1" />
        <stop offset="33.3%" style="stop-color:#fff; stop-opacity:1" />
        <stop offset="50%" style="stop-color:#fff; stop-opacity:1" />
        <stop offset="66.7%" style="stop-color:#9f9; stop-opacity:1" />
        <stop offset="83.3%" style="stop-color:#0f0; stop-opacity:1" />
        <stop offset="100%" style="stop-color:#bfb; stop-opacity:1" />
      </linearGradient>
    </defs>
  </svg>
  `;
  const upperGradientUri = `data:image/svg+xml,${encodeURIComponent(upperGradientDef)}`;
  setCssVar('box-upper', `url('${upperGradientUri}#gradient')`);
  const lowerGradientDef = `
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#bbf; stop-opacity:1" />
        <stop offset="16.7%" style="stop-color:#00f; stop-opacity:1" />
        <stop offset="33.3%" style="stop-color:#99f; stop-opacity:1" />
        <stop offset="50%" style="stop-color:#fff; stop-opacity:1" />
        <stop offset="66.7%" style="stop-color:#fff; stop-opacity:1" />
        <stop offset="83.3%" style="stop-color:#99f; stop-opacity:1" />
        <stop offset="100%" style="stop-color:#00f; stop-opacity:1" />
      </linearGradient>
    </defs>
  </svg>
  `;
  const lowerGradientUri = `data:image/svg+xml,${encodeURIComponent(lowerGradientDef)}`;
  setCssVar('box-lower', `url('${lowerGradientUri}#gradient')`);
  setCssVar('foreground-1', `linear-gradient(
    to bottom,
    #0f0 0%,
    #9f9 20%,
    #fff 40%,
    #fff 60%,
    #9f9 80%,
    #0f0 100%
  )`);
  setCssVar('foreground-2', `linear-gradient(
    to bottom,
    #00f 0%,
    #99f 20%,
    #fff 40%,
    #fff 60%,
    #99f 80%,
    #00f 100%
  )`);
}