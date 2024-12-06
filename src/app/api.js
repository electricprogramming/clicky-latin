const api = {
  /**
   * @param {number} id 
   * @returns {Promise<{ name: string, items: Array<string> }>}
   */
  GET: async (id) => {
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
   * @param {{name: number, items: Array}} toPost 
   * @returns {Promise<number>}
   */
  POST: async (toPost) => {
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
  DELETE: async (id) => {
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
  ALL: async () => {
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