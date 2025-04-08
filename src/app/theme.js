import { isMay4th } from './special-days.js';

if (isMay4th()) {
  const gradientDef = `
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0f0; stop-opacity:1" />
        <stop offset="18%" style="stop-color:#9f9; stop-opacity:1" />
        <stop offset="36%" style="stop-color:#fff; stop-opacity:1" />
        <stop offset="64%" style="stop-color:#fff; stop-opacity:1" />
        <stop offset="82%" style="stop-color:#9f9; stop-opacity:1" />
        <stop offset="100%" style="stop-color:#0f0; stop-opacity:1" />
      </linearGradient>
    </defs>
  </svg>`;
  const url = `data:image/svg+xml,${encodeURIComponent(gradientDef)}`;
  document.documentElement.style.setProperty('--color-box-upper', `url('${url}#gradient')`);
}