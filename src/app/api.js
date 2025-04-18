window.cachedGames = null;
const apiUrl = 'https://clickylatin-api.vercel.app';

const api = {
  /**
   * @param {number} id 
   * @returns {Promise<{ name: string, items: Array<string> }>}
   */
  GET: async function(id) {
    return new Promise((resolve, reject) => {
      fetch(`${apiUrl}/get-game?gamecode=${id}`)
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
    fetch(`${apiUrl}/all`)
      .then(res => res.json())
      .then(data => {
        resolve(data)
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
  SEARCH: async function(query, options) {
    return new Promise(async (resolve) => {
      const queryKeywords = query.toLowerCase().split(/\s/).filter(item => /\S/.test(item));
      if (options?.re_fetch || !cachedGames) {
        const games = await this.ALL();
        cachedGames = games;
      }
      const results = Object.entries(cachedGames)
        .map(([id, {name, items, unlisted}]) => {
          return { id, name, items, unlisted };
        })
        .filter(game => !game.unlisted)
        .filter(({ name }) => {
          const nameKeywords = name.toLowerCase().split(/\s/).filter(item => /\S/.test(item));
          return queryKeywords.every(queryKeyword => 
            nameKeywords.some(nameKeyword => 
              nameKeyword.startsWith(queryKeyword) || queryKeyword.startsWith(nameKeyword)
            )
          );
        })
        .sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          else return 0;
        });
      resolve(results);
    });
  },
  /**
   * @param {({name: string, items: Array})} toPost 
   * @returns {Promise<number>}
   */
  POST: async function(toPost) {
    return new Promise((resolve, reject) => {
      fetch(`${apiUrl}/create`, {
        method: 'POST',
        body: JSON.stringify(toPost),
        headers: {
          'Content-Type': 'application/json'
        }
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
  }
}
export default api;