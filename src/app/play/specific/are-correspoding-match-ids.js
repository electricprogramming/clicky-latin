/**
 * 
 * @param {String} matchId1 
 * @param {String} matchId2 
 * @returns {Boolean}
 */
export default function areCorrespondingMatchIds(matchId1, matchId2) {
  const lang1 = matchId1.slice(1), lang2 = matchId2.slice(2);
  if (![lang1, lang2].includesAll('E', 'L')) return false;
}