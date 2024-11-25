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