import '../globalMods.js';
import gameCode from './get-game-code.js';
import api from '../api.js';
import createElement from './create-element.js';
import loadGameNotFoundPage from '../play/specific/load-game-not-found-page.js';
const gameContainer = document.getElementById('game-container');
const loadingSpinner = document.getElementById('loading-spinner');
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
  Array.shuffle(allWords).forEach(({language, matchId, word}) => {
    createElement(language, matchId, word);
  });
  loadingSpinner.style.display = 'none';
  domtoimage.toPng(gameContainer)
    .then(pngUri => {
      const img = document.createElement('img');
      img.src = pngUri;
      img.alt = 'Image not found';
      img.id = 'freezeframe-image';
      gameContainer.remove();
      document.body.appendChild(img);
      img.style.transform = 'translate(-5px, -5px)'; // Account for image offset
    });
} else {
  loadGameNotFoundPage();
}