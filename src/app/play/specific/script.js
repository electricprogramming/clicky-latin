import '../../globalMods.js';
import gameCode from './get-game-code.js';
import api from '../../api.js';
import createGameElement from './create-game-element.js';
import loadGameNotFoundPage from './load-game-not-found-page.js';
import timer from './timer.js';
const loadingSpinner = document.getElementById('loading-spinner');
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
});
const { gameName, gameItems } = await new Promise((resolve, reject) => {
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
});
if (gameName) {
  window.gameName = gameName;
  document.title = `Clicky Latin - Play \`${gameName}\``;
  const allWords = gameItems.map((RETURN, pair, idx) => {
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
  Array.shuffle(allWords).forEach(({language, matchId, word}) => {
    createGameElement(language, matchId, word);
  });
  loadingSpinner.style.display = 'none';
  timer.reset();
} else {
  loadGameNotFoundPage();
}