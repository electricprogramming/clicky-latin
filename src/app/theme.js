import { isChristmas, isEaster, isJuly4th, isMay4th, isThanksgiving } from './special-days.js';

function setCssVar(name, value) {
  if (typeof name === 'string') {
    document.documentElement.style.setProperty(`--${name}`, value);
  }
}

if (isChristmas()) {
  setCssVar('color-background', '#003');
  setCssVar('color-box-upper', '#d11');
  setCssVar('color-box-lower', '#0a2');
} else if (isEaster()) {
  setCssVar('color-background', '#2f5');
  setCssVar('color-box-upper', '#f9b');
  setCssVar('color-box-lower', '#ff4');
} else if (isThanksgiving()) {
  setCssVar('color-background', '#7a2');
  setCssVar('color-box-upper', '#b23');
  setCssVar('color-box-lower', '#fa0');
} else if (isJuly4th()) {
  setCssVar('color-background', '#fff');
  setCssVar('color-box-upper', '#f00');
  setCssVar('color-box-lower', '#00f');
} else if (isMay4th()) {
  // Star Wars theme
  setCssVar('color-background', '#000');
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
  </svg>`;
  const upperGradientUri = `data:image/svg+xml,${encodeURIComponent(upperGradientDef)}`;
  setCssVar('color-box-upper', `url('${upperGradientUri}#gradient')`);
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
  </svg>`;
  const lowerGradientUri = `data:image/svg+xml,${encodeURIComponent(lowerGradientDef)}`;
  setCssVar('color-box-lower', `url('${lowerGradientUri}#gradient')`);
}