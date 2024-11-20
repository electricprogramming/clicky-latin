import api from '/src/app/api.js';
import messages from '/src/app/messages.js';
import getLastCommitMessage from '/src/get-recent-commit-msg.js';
import createPreviewElement from './create-preview-element.js';
getLastCommitMessage()
  .then(msg => {
    console.log('Most recent commit name:', msg);
  })
  .catch(err => {
    console.error('Error fetching most recent commit name:', err)
  });
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
createPairConfirmBtn.addEventListener('click', () => {
  const englishWord = createPairEnglishInput.value;
  const latinWord = createPairLatinInput.value;
  if (englishWord.length === 0 || latinWord.length === 0) {
    alert('Neither word can be empty.');
  } else if (englishWords.includes(englishWord) || latinWords.includes(latinWord)) {
    alert('One of the words is already in this game.');
  } else if (englishWord.length > 20) {
    alert('The English word is too long.');
  } else if (latinWord.length > 20) {
    alert('The Latin word is too long.');
  } else {
    createPairModal.style.display = 'none';
    messages.broadcast('new-pair', englishWord, latinWord);
    createPairEnglishInput.value = '';
    createPairLatinInput.value = '';
  }
});
saveBtn.addEventListener('click', () => {
  saveModal.style.display = 'flex';
});
saveCancelBtn.addEventListener('click', () => {
  saveModal.style.display = 'none';
});
saveConfirmBtn.addEventListener('click', () => {
  const name = saveNameInput.value;
  if (name.length === 0) {
    alert('The name cannot be empty.'); return;
  }
  alert('posting, please wait.');
  saveModal.style.display = 'none';
});