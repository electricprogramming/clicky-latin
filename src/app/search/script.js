import '../globalMods.js';
import api from '../api.js';
import showSearchResults from './show-search-results.js';
const searchBar = document.getElementById('search-bar');
const searchSubmit = document.getElementById('search-submit');
const loadingSpinner = document.getElementById('loading-spinner');
if (document.referrer === 'https://clickylatin.vercel.app/') {
  searchBar.focus();
}
function submitSearch(options) {
  const query = searchBar.value;
  loadingSpinner.style.display = 'block';
  api.SEARCH(query, options)
    .then(results => {
      loadingSpinner.style.display = 'none';
      showSearchResults(results);
    })
    .catch(err => {
      console.error(err);
      if (confirm('An error has occured while searching. Please refresh the page and try again.')) {
        window.location.reload(true);
      }
    });
}
const query = new URLSearchParams(window.location.search).get('q');
if (query) {
  searchBar.value = query;
}
submitSearch();
searchSubmit.addEventListener('click', () => {
  submitSearch({ re_fetch: true });
});
searchBar.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    submitSearch({ re_fetch: true });
  }
});
searchBar.addEventListener('input', () => {
  submitSearch();
});