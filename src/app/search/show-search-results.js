import showSearchResult from './show-search-result.js';
/** 
 * @param {Array<{id: number, name: string, items: Array}>} results 
 */
export default function showSearchResults(results) {
  results.forEach(({ id, name, items }) => {
    showSearchResult(id, name, items);
  });
}