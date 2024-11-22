import gameCode from './get-game-code.js';
import api from '../../api.js';
api.GET(gameCode).then(res => console.log(res));