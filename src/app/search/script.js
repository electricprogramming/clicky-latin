import '../globalMods.js';
import api from '../api.js';
import submitSearch from './submit-search.js';
import showSearchResults from './show-search-results.js';
window.cachedIframes = {};
const searchBar = document.getElementById('search-bar');
const searchSubmit = document.getElementById('search-submit');
const loadingSpinner = document.getElementById('loading-spinner');
if (document.referrer === 'https://clickylatin.vercel.app/') {
  searchBar.focus();
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