/**
 * 
 * @param {String} matchId1 
 * @param {String} matchId2 
 * @returns {Boolean}
 */
export default function areCorrespondingMatchIds(matchId1, matchId2) {
  const lang1 = matchId1.substring(0,1), lang2 = matchId2.substring(0,1),
    id1 = matchId1.slice(1), id2 = matchId2.slice(1);
  return ( 
    id1 === id2 &&
    [lang1, lang2].includesAll('E', 'L')
  );
}