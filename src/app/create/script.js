const createPairButton = document.getElementById('create-pair-btn');
const saveButton = document.getElementById('save-btn');
const saveModal = document.getElementById('save-modal');
saveButton.addEventListener('click', () => {
  alert ('saving')
  saveModal.style.display = '';
});