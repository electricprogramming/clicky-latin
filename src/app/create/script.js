import api from '/src/app/api.js';
const createPairBtn = document.getElementById('create-pair-btn');
const saveBtn = document.getElementById('save-btn');
const saveModal = document.getElementById('save-modal');
const saveNameInput = document.getElementById('save-name-input');
const saveCancelBtn = document.getElementById('save-cancel-btn');
const saveConfirmBtn = document.getElementById('save-confirm-btn');
saveBtn.addEventListener('click', () => {
  saveModal.style.display = 'flex';
});
saveCancelBtn.addEventListener('click', (e) => {
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