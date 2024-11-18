const createPairButton = document.getElementById('create-pair-btn');
const saveButton = document.getElementById('save-btn');
const saveModal = document.getElementById('save-modal');
const saveNameInput = document.getElementById('save-name-input');
const saveCancelBtn = document.getElementById('save-cancel-btn');
const saveConfirmBtn = document.getElementById('save-confirm-btn');
saveButton.addEventListener('click', () => {
  saveModal.style.display = 'flex';
});
saveModal.addEventListener('click', (e) => {
  if (e.target === saveModal || e.target === saveCancelBtn) saveModal.style.display = 'none';
});
saveConfirmBtn.addEventListener('click', () => {
  const name = saveNameInput.value;
  console.log(name);
});