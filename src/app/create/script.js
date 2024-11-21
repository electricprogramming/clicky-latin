import api from '/src/app/api.js';
import messages from '/src/app/messages.js';
import createPreviewElement from './create-preview-element.js';
const createPairBtn = document.getElementById('create-pair-btn');
const createPairModal = document.getElementById('create-pair-modal');
const createPairEnglishInput = document.getElementById('create-pair-english-input');
const createPairLatinInput = document.getElementById('create-pair-latin-input');
const createPairCancelBtn = document.getElementById('create-pair-cancel-btn');
const createPairConfirmBtn = document.getElementById('create-pair-confirm-btn');
const saveBtn = document.getElementById('save-btn');
const saveModal = document.getElementById('save-modal');
const saveNameInput = document.getElementById('save-name-input');
const saveCancelBtn = document.getElementById('save-cancel-btn');
const saveConfirmBtn = document.getElementById('save-confirm-btn');
const cloudSavingModal = document.getElementById('cloud-saving-modal');
const cloudSavingText = document.getElementById('cloud-saving-text');
let englishWords = [];
let latinWords = [];
let allWords = [];
messages.on('new-pair', (englishWord, latinWord) => {
  allWords.push([englishWord, latinWord]);
  englishWords.push(englishWord);
  latinWords.push(latinWord);
});
messages.on('new-pair', (englishWord, latinWord) => {
  createPreviewElement(englishWord, latinWord);
});
createPairBtn.addEventListener('click', () => {
  createPairModal.style.display = 'flex';
});
createPairCancelBtn.addEventListener('click', () => {
  createPairModal.style.display = 'none';
  createPairEnglishInput.value = '';
  createPairLatinInput.value = '';
});
messages.on('new-pair-submit', () => {
  const englishWord = createPairEnglishInput.value;
  const latinWord = createPairLatinInput.value;
  if (englishWord.length === 0 || latinWord.length === 0) {
    alert('Neither word can be empty.');
  } else if (englishWords.includes(englishWord) || latinWords.includes(latinWord)) {
    alert('At least one of the words is already in this game.');
  } else if (englishWord.length > 25) {
    alert('The English word is too long.');
  } else if (latinWord.length > 25) {
    alert('The Latin word is too long.');
  } else {
    createPairModal.style.display = 'none';
    messages.broadcast('new-pair', englishWord, latinWord);
    createPairEnglishInput.value = '';
    createPairLatinInput.value = '';
  }
});
createPairConfirmBtn.addEventListener('click', () => {
  messages.broadcast('new-pair-submit');
});
createPairLatinInput.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') messages.broadcast('new-pair-submit');
});
saveBtn.addEventListener('click', () => {
  saveModal.style.display = 'flex';
});
saveCancelBtn.addEventListener('click', () => {
  saveModal.style.display = 'none';
});
messages.on('save-confirm', () => {
  const name = saveNameInput.value;
  if (name.length === 0) {
    alert('The game name cannot be empty.'); return;
  }
  saveModal.style.display = 'none';
  cloudSavingModal.style.display = 'flex';
  if (01) { // toggle switch for whether or not it should save to the cloud
      api.POST({
      name,
      items: allWords
    }).then(gameCode => {
      cloudSavingText.textContent = `Success! Your Game Code is ${gameCode}`;

    }).catch(e => {
      console.error(e);
      cloudSavingText.textContent = 'Error - please reload the page.'
    });
  }
});
saveConfirmBtn.addEventListener('click', () => {
  messages.broadcast('save-confirm');
});
saveNameInput.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') messages.broadcast('save-confirm');
});
messages.on('remove-pair', (englishWord, latinWord) => {
  englishWords = englishWords.filter(item => item !== englishWord);
  latinWords = latinWords.filter(item => item !== latinWord);
  allWords = allWords.filter(item => !(item[0] === englishWord && item[1] === latinWord));
});