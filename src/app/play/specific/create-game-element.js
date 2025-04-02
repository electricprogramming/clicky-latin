import getFontSize from '../../get-font-size.js';
import makeElementDraggable from './make-el-draggable.js';
import pythagoras from './pythagoras.js';
import isInMatchDist from './is-in-match-dist.js';
import areCorrespondingMatchIds from './are-correspoding-match-ids.js';
import createPairedElement from './create-paired-element.js';
import isGameCompleted from './is-game-complete.js';
import msToMinAndSec from '../../ms-to-min-and-sec.js';
import timer from './timer.js';
import isMobile from '../../is-mobile.js';
import { clickSound, incorrectSound } from './sound-effects.js';
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
let mistakeCount = 0;
/**
 * More advanced version that works for desktop.
 * @param {('English' | 'Latin')} language 
 * @param {string} matchId 
 * @param {string} word 
 */
function _createGameElementDesktop(language, matchId, word) {
  const isEnglish = (language === 'English');
  const parser = new DOMParser();
  const el = parser.parseFromString(isEnglish? englishBaseSvg : latinBaseSvg, 'image/svg+xml').documentElement;
  const text = el.querySelector('.text');
  text.textContent = word;
  text.setAttribute('font-size', getFontSize(word));
  el.classList.add('game-element');
  el.setAttribute('lang', language);
  el.setAttribute('matchId', matchId);
  el.setAttribute('word', word);
  document.getElementById('game-container').appendChild(el);
  const elRect = el.getBoundingClientRect();
  let newLeft = Math.round(Math.random() * (window.innerWidth - elRect.width));
  let newTop = Math.round(Math.random() * (window.innerHeight - elRect.height));
  let newRight = window.innerWidth - newLeft - elRect.width;
  let newBottom = window.innerHeight - newTop - elRect.height;
  // fencing
  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newRight < 0) newRight = 0;
  if (newBottom < 0) newBottom = 0;

  newLeft = newLeft / window.innerWidth * 100;
  newRight = newRight / window.innerWidth * 100;
  newTop = newTop / window.innerHeight * 100;
  newBottom = newBottom / window.innerHeight * 100;

  if (newLeft <= newRight) {
    el.style.right = '';
    el.style.left = `${newLeft}vw`;
  } else {
    el.style.left = '';
    el.style.right = `${newRight}vw`;
  }
  if (newTop <= newBottom) {
    el.style.bottom = '';
    el.style.top = `${newTop}vh`;
  } else {
    el.style.top = '';
    el.style.bottom = `${newBottom}vh`;
  }

  makeElementDraggable(el, null, () => {
    const myPos = {
      x: parseFloat(window.getComputedStyle(el).left) || 0,
      y: parseFloat(window.getComputedStyle(el).top) || 0,
      el
    };
    const closestElementPos = Array.from(document.querySelectorAll(`.game-element[lang="${isEnglish? 'Latin' : 'English'}']`))
      .map((otherEl) => {
        return {
          x: parseFloat(window.getComputedStyle(otherEl).left) || 0,
          y: parseFloat(window.getComputedStyle(otherEl).top) || 0,
          el: otherEl
        };
      })
      .sort((otherPos1, otherPos2) => {
        const otherX1 = otherPos1.x, otherY1 = otherPos1.y, otherX2 = otherPos2.x, otherY2 = otherPos2.y;
        const [otherAdjustedY1, otherAdjustedY2] = isEnglish ?
          [otherY1 - (elRect.height * 2 / 3), otherY2 - (elRect.height * 2 / 3)] : 
          [otherY1 + (elRect.height * 2 / 3), otherY2 + (elRect.height * 2 / 3)];
        const dist1 = pythagoras(
          myPos.x - otherX1,
          myPos.y - otherAdjustedY1
        ),
        dist2 = pythagoras(
          myPos.x - otherX2,
          myPos.y - otherAdjustedY2
        );
        return dist1 - dist2;
      })
      [0];
    if (isEnglish? isInMatchDist(myPos, closestElementPos) : isInMatchDist(closestElementPos, myPos)) {
      const myMatchId = el.getAttribute('matchId');
      const closestMatchId = closestElementPos.el.getAttribute('matchId');
      if (areCorrespondingMatchIds(myMatchId, closestMatchId)) {
        const me = el;
        const myMatch = closestElementPos.el;
        const englishBlock = isEnglish ? me : myMatch;
        const latinBlock = isEnglish ? myMatch : me;
        const englishStyle = getComputedStyle(englishBlock);
        const latinStyle = getComputedStyle(latinBlock);
        const englishWord = englishBlock.getAttribute('word');
        const latinWord = latinBlock.getAttribute('word');

        let fromTop, fromBottom, fromLeft, fromRight;

        if (isEnglish) {
          fromBottom = parseFloat(latinStyle.bottom) / window.innerHeight * 100;
          fromLeft = parseFloat(latinStyle.left) / window.innerWidth * 100;
          fromRight = parseFloat(latinStyle.right) / window.innerWidth * 100;
          fromTop = parseFloat(latinStyle.top) - (elRect.height * 2 / 3) / window.innerHeight * 100;
        } else {
          fromTop = parseFloat(englishStyle.top) / window.innerHeight * 100;
          fromLeft = parseFloat(englishStyle.left) / window.innerWidth * 100;
          fromRight = parseFloat(englishStyle.right) / window.innerWidth * 100;
          fromBottom = parseFloat(englishStyle.bottom) - (elRect.height * 2 / 3) / window.innerHeight * 100;
        }
        
        // fencing
        if (fromTop < 0) fromTop = 0;
        if (fromBottom < 0) fromBottom = 0;
        if (fromLeft < 0) fromLeft = 0;
        if (fromRight < 0) fromRight = 0;

        const isTop = (fromTop <= fromBottom), isLeft = (fromLeft <= fromRight);

        createPairedElement(englishWord, latinWord, {
          [isTop ? 'top' : 'bottom']: isTop ? fromTop : fromBottom,
          [isLeft ? 'left' : 'right']: isLeft ? fromLeft : fromRight,
        });
        me.remove(); myMatch.remove();
        if (!clickSound.paused) {
          clickSound.pause();
          clickSound.currentTime = 0;
        }
        clickSound.play();
        if (isGameCompleted()) {
          clickSound.addEventListener('ended', () => {
            alert(`Congratulations! You completed ${JSON.stringify(gameName)} ${(function() { // iife to get the time taken
              const res = msToMinAndSec(timer.time);
              if (res.minutes > 0)
                return `in ${res.minutes} ${res.minutes === 1? 'minute' : 'minutes'} and ${res.seconds} ${res.seconds === 1? 'second' : 'seconds'}`;
              else 
                return `in ${res.seconds} ${res.seconds === 1? 'second' : 'seconds'}`;
            })()} with ${mistakeCount} ${mistakeCount === 1? 'mistake' : 'mistakes'}!`)
          }, { once: true });
        }
      } else {
        if (!incorrectSound.paused) {
          incorrectSound.pause();
          incorrectSound.currentTime = 0;
        }
        incorrectSound.play();
        mistakeCount ++;
        const vmin = Math.min(window.innerWidth, window.innerHeight);
        const currentTop = parseFloat(getComputedStyle(el).top);
        const adjustment = 40 / 700 * vmin;
        let newTop = isEnglish ? currentTop - adjustment : currentTop + adjustment;
        let newBottom = window.innerHeight - newTop - elRect.height;

        if (newTop < 0) newTop = 0;
        if (newBottom < 0) newBottom = 0;
        newTop = newTop / window.innerHeight * 100;
        newBottom = newBottom / window.innerHeight * 100;

        if (newTop <= newBottom) {
          el.style.bottom = '';
          el.style.top = `${newTop}vh`;
        } else {
          el.style.top = '';
          el.style.bottom = `${newBottom}vh`
        }
      }
    }
  });
}

/**
 * More compatible version that works for mobile.
 * @param {('English' | 'Latin')} language 
 * @param {string} matchId 
 * @param {string} word 
 */
function _createGameElementMobile(language, matchId, word) {
  const isEnglish = (language === 'English');
  const parser = new DOMParser();
  const el = parser.parseFromString(isEnglish ? englishBaseSvg : latinBaseSvg, 'image/svg+xml').documentElement;
  const text = el.querySelector('.text');
  text.textContent = word;
  text.setAttribute('font-size', getFontSize(word));
  el.classList.add('game-element');
  el.setAttribute('lang', language);
  el.setAttribute('matchId', matchId);
  el.setAttribute('word', word);
  document.getElementById('game-container').appendChild(el);
  const elRect = el.getBoundingClientRect();
  el.style.top = `${Math.round(Math.random() * (window.innerHeight - elRect.height))}px`;
  el.style.left = `${Math.round(Math.random() * (window.innerWidth - elRect.width))}px`;
  makeElementDraggable(el, null, () => {
    const myPos = {
      x: parseFloat(el.style.left) || 0,
      y: parseFloat(el.style.top) || 0,
      el
    };
    const closestElementPos = Array.from(document.querySelectorAll(`.game-element[lang="${isEnglish? 'Latin' : 'English'}']`))
      .map((otherEl) => {
        return {
          x: parseFloat(otherEl.style.left) || 0,
          y: parseFloat(otherEl.style.top) || 0,
          el: otherEl
        };
      })
      .sort((otherPos1, otherPos2) => {
        const otherX1 = otherPos1.x, otherY1 = otherPos1.y, otherX2 = otherPos2.x, otherY2 = otherPos2.y;
        const [otherAdjustedY1, otherAdjustedY2] = isEnglish? [otherY1 - (elRect.height * 2/3), otherY2 - (elRect.height * 2/3)] : [otherY1 + (elRect.height * 2/3), otherY2 + (elRect.height * 2/3)];
        const dist1 = pythagoras(
          Math.abs(myPos.x - otherX1),
          Math.abs(myPos.y - otherAdjustedY1)
        ),
        dist2 = pythagoras(
          Math.abs(myPos.x - otherX2),
          Math.abs(myPos.y - otherAdjustedY2)
        );
        return dist1 - dist2;
      })
      [0];
    if (isEnglish? isInMatchDist(myPos, closestElementPos) : isInMatchDist(closestElementPos, myPos)) {
      const myMatchId = el.getAttribute('matchId');
      const closestMatchId = closestElementPos.el.getAttribute('matchId');
      if (areCorrespondingMatchIds(myMatchId, closestMatchId)) {
        const me = el;
        const myMatch = closestElementPos.el;
        const englishWord = isEnglish? me.getAttribute('word'): myMatch.getAttribute('word');
        const latinWord = isEnglish? myMatch.getAttribute('word'): me.getAttribute('word');
        me.remove(); myMatch.remove();
        createPairedElement(englishWord, latinWord, parseFloat(myMatch.style.left, isEnglish? (parseFloat(myMatch.style.top) - (elRect.height * 2/3)) : parseFloat(myMatch.style.top)));
        clickSound.play();
        if (isGameCompleted()) {
          clickSound.addEventListener('ended', () => {
            alert(`Congratulations! You completed ${JSON.stringify(gameName)} ${(function() { // iife to get the time taken
              const res = msToMinAndSec(timer.time);
              if (res.minutes > 0)
                return `in ${res.minutes} ${res.minutes === 1? 'minute' : 'minutes'} and ${res.seconds} ${res.seconds === 1? 'second' : 'seconds'}`;
              else 
                return `in ${res.seconds} ${res.seconds === 1? 'second' : 'seconds'}`;
            })()} with ${mistakeCount} ${mistakeCount === 1? 'mistake' : 'mistakes'}!`)
          }, { once: true });
        }
      } else {
        incorrectSound.play();
        mistakeCount ++;
        const vmin = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
        el.style.top = `${(isEnglish? parseFloat(el.style.top) - (40 / 700 * vmin) : parseFloat(el.style.top) + (40 / 700 * vmin))}px`;
        const elementWidth = el.getBoundingClientRect().width, elementHeight = el.getBoundingClientRect().height;
        let left = parseFloat(el.style.left) || 0;
        let top = parseFloat(el.style.top) || 0;
        if (left < 0) {
          left = 0;
        }
        if (top < 0) {
          top = 0;
        }
        if (left + elementWidth > window.innerWidth) {
          left = window.innerWidth - elementWidth;
        }
        if (top + elementHeight > window.innerHeight) {
          top = window.innerHeight - elementHeight;
        }
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
      }
    }
  });
}

/**
 * Creates a game element and appends it randomly to the page.
 * @param {('English' | 'Latin')} language 
 * @param {string} matchId 
 * @param {string} word 
 */
export default function createGameElement(language, matchId, word) {
  (isMobile() ? _createGameElementMobile : _createGameElementDesktop)(language, matchId, word);
}