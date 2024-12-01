import showSearchResults from './show-search-results';
const searchBar = document.getElementById('search-bar');
const searchSubmit = document.getElementById('search-submit');
if (document.referrer === 'https://clickylatin.vercel.app/') {
  searchBar.focus();
}
searchBar.addEventListener('keydown', e => {
  if (e.code === 'Enter') {
    searchSubmit.click();
    searchBar.blur();
  }
});
searchSubmit.addEventListener('click', () => {
  const query = searchBar.value;
  fetch(`https://clickylatin-api.glitch.me/search?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(results => showSearchResults(results))
    .catch(err => {
      console.error(err);
      alert('An error has occured while searching. Reloading the page...');
      window.location.reload(true);
    });
});