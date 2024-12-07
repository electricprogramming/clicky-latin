const api = {
  /**
   * @param {number} id 
   * @returns {Promise<{ name: string, items: Array<string> }>}
   */
  GET: async function(id) {
    return new Promise((resolve, reject) => {
      fetch(`https://clickylatin-api.glitch.me?id=${String(id)}`)
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  /**
   * @param {string} query 
   * @returns {Promise<Array<{id: number, name: string, items: Array<string>}>>}
   */
  SEARCH: async function(query) {
    return new Promise((resolve, reject) => {
      fetch(`https://clickylatin-api.glitch.me/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  /**
   * @param {({name: string, items: Array})} toPost 
   * @returns {Promise<number>}
   */
  POST: async function(toPost) {
    return new Promise((resolve, reject) => {
      fetch('https://clickylatin-api.glitch.me', {
        method: 'POST',
        body: JSON.stringify(toPost)
      })
        .then(res => res.json())
        .then(data => {
          resolve(data.gameCode);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  /**
   * @param {number} id 
   * @returns {Promise}
   */
  DELETE: async function(id) {
    return new Promise((resolve, reject) => {
      fetch('https://clickylatin-api.glitch.me', {
        method: 'DELETE',
        body: String(id)
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  },
  /**
   * @returns {Promise<Array<{ name: string, items: Array<string> }> >}
   */
  ALL: async function() {
    return new Promise((resolve, reject) => {
    fetch('https://clickylatin-api.glitch.me/all')
      .then(res => res.json())
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
    });
  }
}
export default api;