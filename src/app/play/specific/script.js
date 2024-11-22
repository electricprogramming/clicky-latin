import gameCode from './get-game-code.js';
import api from '../../api.js';
const gameData = await new Promise((resolve, reject) => {
  api.GET(gameCode)
    .then(res => resolve(res))
    .catch(err => {
      console.error(err);
      reject(err);
    });
});
document.title = `Play ${gameData.name} on Clicky Latin`;