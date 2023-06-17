const imageContainer = document.querySelector('.image-container')
const messageContainer = document.querySelector('.message-container')
const textEntry = document.querySelector('.text-entry')
const textInit = messageContainer.textContent.trim()
const enterButton = document.querySelector('.enter-button')

const squeak = new Audio('squeak.mp3')
const bloop = new Audio('bloop.mp3')
var isMuted = false

document.addEventListener('DOMContentLoaded', function() {
  var volumeToggle = document.getElementById('volume-toggle')

  volumeToggle.addEventListener('click', function() {
    if (isMuted) {
      volumeToggle.classList.remove('fa-volume-off')
      volumeToggle.classList.add('fa-volume-up')
    } else {
      volumeToggle.classList.remove('fa-volume-up')
      volumeToggle.classList.add('fa-volume-off')
    }

    isMuted = !isMuted
  })
})

function playSound(sound) {
  if (isMuted) {
    console.log("Sound is muted")
  } else {
    if (sound == "squeak") {
      squeak.play()
    } else {
      bloop.play()
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function appendMessage(message, userMessage) {

    var messageElement = document.createElement('div')
    messageElement.textContent = message;

    var quackElement = document.createElement('div')
    quackElement.textContent = "*quack!*"
  
    if (message !== '') {
      if (userMessage) {     
        messageElement.classList.add('user-message')
        messageContainer.appendChild(messageElement);
        playSound("bloop")
        textEntry.value = '';
    } else {
      messageElement.classList.add('chat-message')
      messageContainer.appendChild(messageElement);
      playSound("squeak");
    }
    
    messageContainer.scrollTop = messageContainer.scrollHeight;   
  }
}

imageContainer.addEventListener('mousedown', () => {
  imageContainer.classList.add('clicked')
  playSound("squeak")
})

imageContainer.addEventListener('touchstart', () => {
  imageContainer.classList.add('clicked');
  playSound("squeak")
})

imageContainer.addEventListener('mouseup', () => {
  imageContainer.classList.remove('clicked')
})

//imageContainer.addEventListener('touchend', () => {
//  imageContainer.classList.remove('clicked');
//})


textEntry.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    appendMessage(textEntry.value.trim(), true)
    sleep(2000).then(() => { appendMessage("*quack!*", false) });
  }
})

enterButton.addEventListener('mousedown', () => {
  appendMessage(textEntry.value.trim(), true)
  sleep(500).then(() => { appendMessage("*quack!*", false) });
})