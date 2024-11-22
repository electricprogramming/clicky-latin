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
const cloudSavingCopyURLbtn = document.getElementById('cloud-save-copyurl-btn');
const cloudSavingDonebtn = document.getElementById('cloud-save-done-btn');
let englishWords = [];
let latinWords = [];
let allWords = [];
messages.on('new-pair', (englishWord, latinWord) => {
  allWords.push([englishWord, latinWord]);
  englishWords.push(englishWord);
  latinWords.push(latinWord);
  createPreviewElement(englishWord, latinWord);
});
createPairBtn.addEventListener('click', () => {
  createPairModal.style.display = 'flex';
  createPairEnglishInput.focus();
});
createPairCancelBtn.addEventListener('click', () => {
  createPairModal.style.display = 'none';
  createPairEnglishInput.value = '';
  createPairLatinInput.value = '';
});
messages.on('new-pair-submit', () => {
  const englishWord = createPairEnglishInput.value.trim();
  const latinWord = createPairLatinInput.value.trim();
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
  if (allWords.length >= 2) {
    saveModal.style.display = 'flex';
    saveNameInput.focus();
  } else {
    alert('Minimum 2 pairs required.');
  }
});
saveCancelBtn.addEventListener('click', () => {
  saveModal.style.display = 'none';
});
messages.on('save-confirm', () => {
  const name = saveNameInput.value.trim();
  if (name.length === 0) {
    alert('The game name cannot be empty.'); return;
  }
  saveModal.style.display = 'none';
  cloudSavingModal.style.display = 'flex';
  if ('1') { // toggle switch for whether or not it should save to the cloud
      api.POST({
      name,
      items: allWords
    }).then(gameCode => {
      cloudSavingText.textContent = `Success! Your Game Code is ${gameCode}`;
      cloudSavingCopyURLbtn.style.display = 'block';
      cloudSavingDonebtn.style.display = 'block';
      cloudSavingCopyURLbtn.addEventListener('click', () => {
        navigator.clipboard.writeText(`https://clickylatin.vercel.app/play/${gameCode}`);
      });
      cloudSavingDonebtn.addEventListener('click', () => {
        window.location.href = 'https://clickylatin.vercel.app';
      });
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
const homeSVG = document.getElementById('back-home-svg');
const homeBtn = document.getElementById('back-home-btn');
homeBtn.addEventListener('mouseenter', () => {
  homeSVG.style.transform = 'scale(1.1)';
});
homeBtn.addEventListener('mouseleave', () => {
  homeSVG.style.transform = 'scale(1.0)';
});
homeBtn.addEventListener('click', () => {
  window.location.href = 'https://clickylatin.vercel.app';
});