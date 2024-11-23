import '../../globalMods.js';
import gameCode from './get-game-code.js';
import api from '../../api.js';
import createGameElement from './create-game-element.js';
const {gameName, gameItems} = await new Promise((resolve, reject) => {
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
document.title = `Clicky Latin - Play ${gameName}`;
const englishWords = gameItems.map(([englishWord]) => englishWord), latinWords = gameItems.map(([, latinWord]) => latinWord);
Array.shuffle(englishWords).forEach(englishWord => {
  createGameElement('English', englishWord);
});
Array.shuffle(latinWords).forEach(latinWord => {
  createGameElement('English', latinWord);
});