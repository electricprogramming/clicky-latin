import { isMay4th } from './special-days.js';

if (isMay4th()) {
  document.documentElement.style.setProperty('--color-background', '#000');
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
  document.documentElement.style.setProperty('--color-box-upper', `url('${upperGradientUri}#gradient')`);
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
  document.documentElement.style.setProperty('--color-box-lower', `url('${lowerGradientUri}#gradient')`);
}