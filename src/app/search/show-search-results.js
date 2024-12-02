import showSearchResult from './show-search-result.js';
export default function showSearchResults(results) {
  results.forEach(({name, id}) => {
    showSearchResult(id, name);
  });
}