import getFontSize from '../../get-font-size.js';
import makeElementDraggable from './make-el-draggable.js';
import pythagoras from './pythagoras.js';
const englishBaseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="225" viewBox="0 0 600 225">
  <g id="content">
    <path fill="#0d3" d="M4,4 H596 V221 H450 L400,150 H200 L150,221 H4 Z" stroke="black" stroke-width="8"/>
    <text class="text" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="75"></text>
  </g>
</svg>`, latinBaseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="225" viewBox="0 0 600 225">
  <g id="content">
    <path fill="#09f" d="M4,221 H596 V75 H450 L400,4 H200 L150,75 H4 Z" stroke="black" stroke-width="8"/>
    <text class="text" fill="black" font-family="Courier New" text-anchor="middle" dominant-baseline="middle" x="300" y="150"></text>
  </g>
</svg>`;
/**
 * @param {('English' | 'Latin')} language
 * @param {String} word
 */
export default function createGameElement(language, matchId, word) {
  const parser = new DOMParser();
  const el = parser.parseFromString(language === 'English'? englishBaseSvg : latinBaseSvg, "image/svg+xml").documentElement;
  const text = el.querySelector('.text');
  text.textContent = word;
  text.setAttribute('font-size', getFontSize(word));
  el.classList.add('game-element');
  el.setAttribute('lang', language);
  el.setAttribute('matchId', matchId);
  document.getElementById('game-container').appendChild(el);
  const elRect = el.getBoundingClientRect();
  el.style.top = Math.round(Math.random() * (window.innerHeight - elRect.height)) + 'px';
  el.style.left = Math.round(Math.random() * (window.innerWidth - elRect.width)) + 'px';
  if (language == 'English') {
    makeElementDraggable(el, null, () => {
      const myPos = {
        x: el.style.left || 0,
        y: el.style.top || 0
      };
      const closestItem = Array.from(document.querySelectorAll(`.game-element[lang="Latin"]`))
        .map((RETURN, otherEl) => {
          RETURN({x: parseFloat(otherEl.style.left) || 0, y: parseFloat(otherEl.style.top)});
        })
        .sort((otherPos1, otherPos2) => {
          const otherX1 = otherPos1.x, otherY1 = otherPos1.y, otherX2 = otherPos2.x, otherY2 = otherPos2.y;
          const [otherAdjustedY1, otherAdjustedY2] = [otherY1 + (elRect.height * 2/3), otherY2 + (elRect.height * 2/3)];
          const dist1 = pythagoras(myPos, {
            x: otherX1,
            y: otherAdjustedY1
          }),
          dist2 = pythagoras(myPos, {
            x: otherX2,
            y: otherAdjustedY2
          });
          return dist1 - dist2;
        })
        [0];
      console.log(closestItem);
    });
  } else {
    makeElementDraggable(el, null, () => {
      const myPos = {
        x: el.style.left || 0,
        y: el.style.top || 0
      };
      const closestItem = Array.from(document.querySelectorAll(`.game-element[lang="English"]`))
        .map((RETURN, otherEl) => {
          RETURN({x: parseFloat(otherEl.style.left) || 0, y: parseFloat(otherEl.style.top), el: otherEl});
        })
        .sort((otherPos1, otherPos2) => {
          const otherX1 = otherPos1.x, otherY1 = otherPos1.y, otherX2 = otherPos2.x, otherY2 = otherPos2.y;
          const [otherAdjustedY1, otherAdjustedY2] = [otherY1 - (elRect.height * 2/3), otherY2 - (elRect.height * 2/3)];
          const dist1 = pythagoras(myPos, {
            x: otherX1,
            y: otherAdjustedY1
          }),
          dist2 = pythagoras(myPos, {
            x: otherX2,
            y: otherAdjustedY2
          });
          return dist1 - dist2;
        })
        [0];
      console.log(closestItem);
    });
  }
}