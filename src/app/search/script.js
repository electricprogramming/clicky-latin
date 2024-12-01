const searchBar = document.getElementById('search-bar');
if (sessionStorage.getItem('shouldFocusSearchbarInstantly')) {
  searchBar.focus();
}