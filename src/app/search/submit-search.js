import api from '../api.js';
export default function submitSearch(query, options) {
  const loadingSpinner = document.getElementById('loading-spinner');
  document.querySelectorAll('.result-element').forEach(el => el.style.display = 'none');
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