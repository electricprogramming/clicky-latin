if (window.self === window.top) { // prevent iframes from logging in the search page
  (async function() {
    return new Promise((resolve, reject) => {
      fetch(`https://clickylatin-api.glitch.me/current-deployment-msg?timestamp=${Date.now()}`)
        .then(res => res.json())
        .then(data => resolve(data.message))
        .catch(err => reject(err));
    });
  })()
    .then(msg => {
      console.log('Current deployment message:', msg);
    })
    .catch(err => {
      console.error('Error fetching current deployment message:', err)
    });
}