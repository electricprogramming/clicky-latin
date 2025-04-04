import '../globalMods.js';
import gameCode from './get-game-code.js';
import api from '../api.js';
import createElement from './create-element.js';
import loadGameNotFoundPage from '../play/specific/load-game-not-found-page.js';
import deterministicShuffle from './deterministic-shuffle.js';
const loadingSpinner = document.getElementById('loading-spinner');
const { gameName, gameItems } = await new Promise((resolve) => {
  if (window.self === window.top) {
    console.log('Message not recieved, fetching data from API instead.')
    api.GET(gameCode)
      .then(gameData => 
        resolve({
          gameName: gameData.name,
          gameItems: gameData.items
        })
      )
      .catch(err => {
        console.error(err);
        reject(err);
      });
  } else {
    const channel = new BroadcastChannel('GAME_ITEMS_CHANNEL');
    channel.onmessage = function(e) {
      flag = true;
      resolve(e.data);
    }
    channel.postMessage('READY_FOR_GAME_ITEMS');
  }
});
if (gameName) {
  window.gameName = gameName;
  document.title = `Clicky Latin - Play \`${gameName}\``;
  const allWords = gameItems.multiMap((RETURN, pair, idx) => {
    RETURN({
      language: 'English',
      matchId: 'E' + idx.toString(36),
      word: pair[0]
    });
    RETURN({
      language: 'Latin',
      matchId: 'L' + idx.toString(36),
      word: pair[1]
    });
  });
  deterministicShuffle(allWords).forEach(({language, matchId, word}, index) => {
    createElement(language, matchId, word, index);
  });
  loadingSpinner.style.display = 'none';
} else {
  loadGameNotFoundPage();
}