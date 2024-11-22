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