const createPairButton = document.getElementById('create-pair-btn');
const saveButton = document.getElementById('save-btn');
const saveModal = document.getElementById('save-modal');
saveButton.addEventListener('click', () => {
  saveModal.style.display = 'flex';
});
saveModal.addEventListener('click', (e) => {
  console.log(e.target);
  if (e.target === saveModal) {
    saveModal.style.display = 'none';
  }
});