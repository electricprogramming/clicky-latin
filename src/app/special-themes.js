import {
  isChristmas, isEaster, isThanksgiving,
  isHalloween, isEarthDay, isAprilFools,
  isJuly4th, isValentines, isMay4th, isDateX } from './special-days.js';

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
if (isDateX()) {
  setCssVar('background', '#ff0');
  setCssVar('foreground-1', '#f0f');
  setCssVar('foreground-2', '#0ff');
  setCssVar('foreground-3', '#f0f');
  setCssVar('foreground-4', '#0ff');
  setCssVar('main-text', '#000');
  setCssVar('minor-text', '#000');
  setCssVar('main-ui', '#333');
}
if (isChristmas()) {
  setCssVar('background', '#003');
  setCssVar('foreground-1', '#d11');
  setCssVar('foreground-2', '#0a2');
  setCssVar('foreground-3', '#d11');
  setCssVar('foreground-4', '#0a2');
  setCssVar('main-text', '#d11');
  setCssVar('minor-text', '#082');
  setCssVar('main-ui', '#082');
} else if (isEaster()) {
  setCssVar('background', '#2f5');
  setCssVar('foreground-1', '#f9b');
  setCssVar('foreground-2', '#ff4');
  setCssVar('foreground-3', '#f9b');
  setCssVar('foreground-4', '#ff4');
} else if (isThanksgiving()) {
  setCssVar('background', '#7a2');
  setCssVar('foreground-1', '#b23');
  setCssVar('foreground-2', '#fa0');
  setCssVar('foreground-3', '#b23');
  setCssVar('foreground-4', '#fa0');
} else if (isHalloween()) {
  setCssVar('background', '#000');
  setCssVar('foreground-1', '#f80');
  setCssVar('foreground-2', '#ee1');
  setCssVar('foreground-3', '#f80');
  setCssVar('foreground-4', '#ee1');
} else if (isEarthDay()) {
  setCssVar('background', '#29f');
  setCssVar('foreground-1', '#4b5');
  setCssVar('foreground-2', '#765');
  setCssVar('foreground-3', '#4b5');
  setCssVar('foreground-4', '#765');
} else if (isAprilFools()) {
  setCssVar('background', '#fff');
  setCssVar('foreground-1', '#0001');
  setCssVar('foreground-2', '#0001');
  setCssVar('foreground-3', '#0001');
  setCssVar('foreground-4', '#0001');
} else if (isJuly4th()) {
  setCssVar('background', '#fff');
  setCssVar('foreground-1', '#f00');
  setCssVar('foreground-2', '#00f');
  setCssVar('foreground-3', '#f00');
  setCssVar('foreground-4', '#00f');
} else if (isValentines()) {
  setCssVar('background', '#fee');
  setCssVar('foreground-1', '#f00');
  setCssVar('foreground-2', '#f8a');
  setCssVar('foreground-3', '#f00');
  setCssVar('foreground-4', '#f8a');
} else if (isMay4th()) {
  // Star Wars theme
  setCssVar('background', '#000');
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
  setCssVar('foreground-1', `url('${upperGradientUri}#gradient')`);
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
  setCssVar('foreground-2', `url('${lowerGradientUri}#gradient')`);
  setCssVar('foreground-3', `linear-gradient(
    to bottom,
    #0f0 0%,
    #9f9 20%,
    #fff 40%,
    #fff 60%,
    #9f9 80%,
    #0f0 100%
  )`);
  setCssVar('foreground-4', `linear-gradient(
    to bottom,
    #00f 0%,
    #99f 20%,
    #fff 40%,
    #fff 60%,
    #99f 80%,
    #00f 100%
  )`);
}