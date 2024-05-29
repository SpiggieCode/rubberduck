const imageContainer = document.querySelector('.profile-image-container');
const messageContainer = document.querySelector('.message-container');
const textEntry = document.querySelector('.text-entry');
const enterButton = document.querySelector('.enter-button');
const activityMessage = document.querySelector('.activity-message');

const squeak = new Audio('squeak.mp3');
const bloop = new Audio('bloop.mp3');
let isMuted = false;

const activityMessageText = activityMessage.querySelector('p');
const text = activityMessageText.textContent;
activityMessageText.innerHTML = text.split('').map((char, i) => `<span style="animation-delay:${i * 0.1}s">${char}</span>`).join('');

// Function to generate random number in given range
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Handles muting and unmuting sounds on the page
document.addEventListener('DOMContentLoaded', function() {
  const volumeToggle = document.getElementById('volume-toggle');

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

// Sends response to chat after an arbitrary amount of time
// You can reuse this function if you would like to add AI responses
function makeRequest() {
  sleep(randomNumber(400, 700)).then(() => {
    let message_options = Array(
        "*quack!*",
        "*squeak!*",
        "*quack...*",
        "QUACK!",
        "*quack quack!*",
        "*squeeeak!*",
        "*quuuaack!*",
        "*QUACK quack*",
        "*quackety quack!*",
        "*squeakity squeak!*"
    );
    appendMessage(message_options[Math.floor(Math.random()*message_options.length)], false);
  });
}

// Function to play sounds on the page
function playSound(sound) {
  if (isMuted) {
    console.log("Sound is muted");
  } else {
    if (sound === "squeak") {
      squeak.play();
    } else {
      bloop.play();
    }
  }
}

// Sleep function in case the code needs to wait for any period of time
// Used for "dumb" responses when OpenAI is not in use
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function handles adding new messages to the message container
function appendMessage(message, userMessage) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;

  if (message !== '') {
    if (userMessage) {
      messageElement.classList.add('user-message');
      messageContainer.insertBefore(messageElement, messageContainer.firstChild);
      playSound("bloop");
      textEntry.value = '';
    } else {
      activityMessage.classList.toggle("is-visible");
      messageElement.classList.add('chat-message');
      messageContainer.insertBefore(messageElement, messageContainer.firstChild);
      playSound("squeak");
    }
  }
}

// Functions that handle playing the rubber duck sound when clicking on the image
imageContainer.addEventListener('click', () => {
  imageContainer.classList.add('spin');
  playSound("squeak");
  setTimeout(() => {
    imageContainer.classList.remove('spin');
  }, 500); // Duration of the spin animation
});

imageContainer.addEventListener('touchstart', () => {
  imageContainer.classList.add('clicked');
  playSound("squeak");
  setTimeout(() => {
    imageContainer.classList.remove('clicked');
  }, 500); // Duration of the spin animation
});

imageContainer.addEventListener('mouseup', () => {
  imageContainer.classList.remove('clicked');
});

// Function that plays the message sound when the user submits text
function handleTextEntry() {
  if (textEntry.value !== '') {
    appendMessage(textEntry.value.trim(), true);
    activityMessage.classList.toggle("is-visible");
    sleep(500).then(() => {
      makeRequest();
    });
  }
}

textEntry.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleTextEntry();
  }
});

enterButton.addEventListener('mousedown', handleTextEntry);
