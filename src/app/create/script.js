import api from '../api.js';
import messages from '../messages.js';
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
messages.on('new-pair-open', () => {
  createPairModal.style.display = 'flex';
  createPairEnglishInput.focus();
});
createPairBtn.addEventListener('click', () => {
  messages.broadcast('new-pair-open');
});
document.addEventListener('keydown', (e) => {
  if ((e.target === document.body) || (e.target.classList.contains('preview-element')) || (e.target === document.getElementById('preview-container'))) {
    if (e.code === 'KeyN' && e.ctrlKey) {
      e.preventDefault();
      messages.broadcast('new-pair-open');
    }
  }
});
createPairCancelBtn.addEventListener('click', () => {
  createPairModal.style.display = 'none';
  createPairEnglishInput.value = '';
  createPairLatinInput.value = '';
});
messages.on('new-pair-submitted', () => {
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
  messages.broadcast('new-pair-submitted');
});
createPairLatinInput.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') messages.broadcast('new-pair-submitted');
});
messages.on('save-open', () => {
  if (allWords.length >= 2) {
    saveModal.style.display = 'flex';
    saveNameInput.focus();
  } else {
    alert('Minimum 2 pairs required.');
  }
});
saveBtn.addEventListener('click', () => {
  messages.broadcast('save-open');
});
document.addEventListener('keydown', (e) => {
  if ((e.target === document.body) || (e.target.classList.contains('preview-element')) || (e.target === document.getElementById('preview-container'))) {
    if (e.code === 'KeyS' && e.ctrlKey) {
      e.preventDefault();
      messages.broadcast('save-open');
    }
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
        const element = document.createElement('div');
        element.innerHTML = `
          <svg width="605" height="155" viewbox="0 0 605 155" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2.5, 2.5)">
              <rect width="600" height="150" fill="#777" stroke="white" stroke-width="5" rx="40" ry="40"/>
              <text fill="#000" font-family="serif" font-size="75" text-anchor="middle" dominant-baseline="middle" x="300" y="85">Game Url Copied!</text>
            </g>
          </svg>
        `;
        const cloudSavingURLcopied = element.querySelector('svg');
        cloudSavingURLcopied.classList.add('cloud-save-url-copied');
        document.body.appendChild(element);
        cloudSavingURLcopied.style.top = '40%';
        cloudSavingURLcopied.style.transition = 'none';
        cloudSavingURLcopied.style.opacity = '1';
        setTimeout(() => {
          cloudSavingURLcopied.style.transition = 'opacity 1s linear, top 1.25s linear';
          cloudSavingURLcopied.style.opacity = '0';
          cloudSavingURLcopied.style.top = '0';
          setTimeout(() => {
            cloudSavingURLcopied.remove()
          }, 1500);
        }, 0);
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