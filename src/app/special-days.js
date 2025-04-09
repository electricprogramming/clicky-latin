const today = new Date();
function calcEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // Month of Easter
  const day = ((h + l - 7 * m + 114) % 31) + 1; // Day of Easter
  return new Date(year, month - 1, day); // Month is 0-based
}

export function isEaster() {
  const currentYear = today.getFullYear();
  const easterDate = calcEasterDate(currentYear);
  return today.toDateString() === easterDate.toDateString();
}

function calcThanksgivingDate(year) {
  const november1 = new Date(year, 10, 1); 
  const firstThursday = november1.getDate() + (4 - november1.getDay() + 7) % 7;
  return new Date(year, 10, firstThursday + 21);
}

export function isThanksgiving() {
  const currentYear = today.getFullYear();
  const thanksgivingDate = calcThanksgivingDate(currentYear);
  return today.toDateString() === thanksgivingDate.toDateString();
}

export function isChristmas() {
  return today.getMonth() === 11 && today.getDate() === 25;
}

export function isAprilFools() {
  return today.getMonth() === 3 && today.getDate() === 1;
}

export function isJuly4th() {
  return today.getMonth() === 6 && today.getDate() === 4;
}

export function isValentines() {
  return today.getMonth() === 1 && today.getDate() === 14;
}

export function isMay4th() {
  return today.getMonth() === 4 && today.getDate() === 4;
}