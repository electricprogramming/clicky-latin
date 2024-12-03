import showSearchResult from './show-search-result.js';
export default function showSearchResults(results) {
  document.querySelectorAll('.result-element').forEach(el => el.remove());
  results.forEach(({name, id}) => {
    showSearchResult(id, name);
  });
}