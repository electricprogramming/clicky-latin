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
document.title = `Clicky Latin - Play \`${gameName}\``;
const allWords = gameItems.map(pair => {
  return [
    {
      language: 'English',
      value: pair[0]
    },
    {
      language: 'Latin',
      value: pair[1]
    }
  ]
});
Array.shuffle(allWords).forEach(({language, value}) => {
  createGameElement(language, value);
});