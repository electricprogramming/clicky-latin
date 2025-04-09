import {
  isChristmas, isEaster, isThanksgiving,
  isHalloween, isEarthDay, isAprilFools,
  isJuly4th, isValentines, isMay4th, isApril9th } from './special-days.js';

function setCssVar(name, value) {
  if (typeof name === 'string' && /^([a-zA-Z_])([a-zA-Z0-9_-]*)$/.test(name)) {
    document.documentElement.style.setProperty(`--${name}`, value);
  }
}

if (isApril9th()) {
  setCssVar('background', '#ff0');
  setCssVar('foreground-1', '#f0f');
  setCssVar('foreground-2', '#0ff');
}
if (isChristmas()) {
  setCssVar('background', '#003');
  setCssVar('foreground-1', '#d11');
  setCssVar('foreground-2', '#0a2');
} else if (isEaster()) {
  setCssVar('background', '#2f5');
  setCssVar('foreground-1', '#f9b');
  setCssVar('foreground-2', '#ff4');
} else if (isThanksgiving()) {
  setCssVar('background', '#7a2');
  setCssVar('foreground-1', '#b23');
  setCssVar('foreground-2', '#fa0');
} else if (isHalloween()) {
  setCssVar('background', '#000');
  setCssVar('foreground-1', '#f80');
  setCssVar('foreground-2', '#ee1');
} else if (isEarthDay()) {
  setCssVar('background', '#29f');
  setCssVar('foreground-1', '#4b5');
  setCssVar('foreground-2', '#765');  
} else if (isAprilFools()) {
  setCssVar('background', '#fff');
  setCssVar('foreground-1', '#0001');
  setCssVar('foreground-2', '#0001');
} else if (isJuly4th()) {
  setCssVar('background', '#fff');
  setCssVar('foreground-1', '#f00');
  setCssVar('foreground-2', '#00f');
} else if (isValentines()) {
  setCssVar('background', '#fee');
  setCssVar('foreground-1', '#f00');
  setCssVar('foreground-2', '#f8a');
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
}