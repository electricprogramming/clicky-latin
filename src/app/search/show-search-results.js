import showSearchResult from './show-search-result.js';
/** 
 * @param {Array<{id: number, name: string, items: Array}>} results 
 */
export default function showSearchResults(results) {
  document.querySelectorAll('.result-element').forEach(el => el.style.display = 'none');
  results.forEach(({ id, name, items }) => {
    showSearchResult(id, name, items);
  });
}