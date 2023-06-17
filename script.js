const imageContainer = document.querySelector('.image-container');
const paragraph = document.querySelector('.paragraph')
const textEntry = document.querySelector('.text-entry');
const textInit = paragraph.textContent.trim()
const enterButton = document.querySelector('.enter-button');

const audio = new Audio('squeak.mp3');
var isMuted = false;

document.addEventListener('DOMContentLoaded', function() {
  var volumeToggle = document.getElementById('volume-toggle');

  volumeToggle.addEventListener('click', function() {
    if (isMuted) {
      volumeToggle.classList.remove('fa-volume-off');
      volumeToggle.classList.add('fa-volume-up');
    } else {
      volumeToggle.classList.remove('fa-volume-up');
      volumeToggle.classList.add('fa-volume-off');
    }

    isMuted = !isMuted;
  });
});

function playSound() {
  if (isMuted) {
    console.log("Sound is muted")
  } else {
    audio.play()
  }
};

function updateText() {
    var text = textEntry.value.trim();

    if (text !== '') {
      if (paragraph.textContent.trim() === textInit) {
        paragraph.textContent = '';
      }


      var newLine = document.createElement('br');
      var textNode = document.createTextNode(text);
      paragraph.appendChild(textNode);
      paragraph.appendChild(newLine);
      textEntry.value = '';
      paragraph.scrollTop = paragraph.scrollHeight;
    }
}

imageContainer.addEventListener('mousedown', () => {
  imageContainer.classList.add('clicked');
  playSound()
});

imageContainer.addEventListener('touchstart', () => {
  imageContainer.classList.add('clicked');
  playSound()
});

imageContainer.addEventListener('mouseup', () => {
  imageContainer.classList.remove('clicked');
});

//imageContainer.addEventListener('touchend', () => {
//  imageContainer.classList.remove('clicked');
//});


textEntry.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    playSound();
    updateText();
  };
});

enterButton.addEventListener('mousedown', () => {
  playSound();
  updateText();
});