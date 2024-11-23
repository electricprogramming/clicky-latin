import gameCode from './get-game-code.js';
import api from '../../api.js';
const gameData = await new Promise((resolve, reject) => {
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
gameItems.forEach(([englishWord, latinWord]) => {
  
});