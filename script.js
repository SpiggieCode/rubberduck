const imageContainer = document.querySelector('.image-container');
const textEntry = document.querySelector('.text-entry');
const enterButton = document.querySelector('.enter-button');

const audio = new Audio('squeak.mp3');

imageContainer.addEventListener('mousedown', () => {
  imageContainer.classList.add('clicked');
  audio.play();
});

imageContainer.addEventListener('mouseup', () => {
  imageContainer.classList.remove('clicked');
});

textEntry.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    audio.play();
  }
});

enterButton.addEventListener('mousedown', () => {
  audio.play();
});