import api from '../api.js';
import showSearchResults from './show-search-results.js';
const searchBar = document.getElementById('search-bar');
const searchSubmit = document.getElementById('search-submit');
const loadingSpinner = document.getElementById('loading-spinner');
if (document.referrer === 'https://clickylatin.vercel.app/') {
  searchBar.focus();
}
function submitSearch () {
  searchBar.blur();
  const query = searchBar.value;
  document.querySelectorAll('.result-element').forEach(el => el.remove());
  loadingSpinner.style.display = 'block';
  api.SEARCH(query)
    .then(results => {
      loadingSpinner.style.display = 'none';
      showSearchResults(results);
    })
    .catch(err => {
      console.error(err);
      alert('An error has occured while searching. Reloading the page...');
      window.location.reload(true);
    });
}
const query = new URLSearchParams(window.location.search).get('q');
if (query) {
  searchBar.value = query;
}
submitSearch();
searchSubmit.addEventListener('click', submitSearch);
searchBar.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    submitSearch();
  }
});