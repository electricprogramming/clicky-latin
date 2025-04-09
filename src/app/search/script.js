import '../globalMods.js';
import submitSearch from './submit-search.js';
window.cachedIframes = {};
const searchBar = document.getElementById('search-bar');
const searchSubmit = document.getElementById('search-submit');
if (document.referrer === 'https://clickylatin.vercel.app/') {
  searchBar.focus();
}
const query = new URLSearchParams(window.location.search).get('q');
if (query) {
  searchBar.value = query;
}
submitSearch(searchBar.value);
searchSubmit.addEventListener('click', () => {
  submitSearch(searchBar.value, { re_fetch: true });
});
searchBar.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    submitSearch(searchBar.value, { re_fetch: true });
  }
});
searchBar.addEventListener('input', () => {
  submitSearch(searchBar.value);
});