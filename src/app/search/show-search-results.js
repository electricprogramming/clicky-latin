import showSearchResult from './show-search-result.js';
/** 
 * @param {Array<{id: number, name: string}>} results 
 */
export default function showSearchResults(results) {
  document.querySelectorAll('.result-element').forEach(el => el.remove());
  results.forEach(({id, name}) => {
    showSearchResult(id, name);
  });
}