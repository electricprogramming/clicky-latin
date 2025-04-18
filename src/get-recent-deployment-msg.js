if (window.self === window.top) { // prevent iframes from logging in the search page
  fetch(`https://clickylatin-api.vercel.app/current-deployment-msg?timestamp=${Date.now()}`)
    .then(res => res.json())
    .then(data => data.message)
    .then(msg => {
      console.log('Current deployment message:', msg);
    })
    .catch(err => {
      console.error('Error fetching current deployment message:', err)
    });
}