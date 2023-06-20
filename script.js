const imageContainer = document.querySelector('.image-container');
const messageContainer = document.querySelector('.message-container');
const textEntry = document.querySelector('.text-entry');
const textInit = messageContainer.textContent.trim();
const enterButton = document.querySelector('.enter-button');
const activityMessage = document.querySelector('.activity-message');

const apiKeyInput = document.getElementById("api-key-input");
const apiToggle = document.getElementById("api-toggle");
const popoutBox = document.getElementById("popout-box");
const apiSave = document.getElementById("submit-button");

const apiUrl = "https://api.openai.com/v1/completions";
const apiVersion = "text-davinci-003";

const squeak = new Audio('squeak.mp3');
const bloop = new Audio('bloop.mp3');
let isMuted = false;

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

// Enables or disables the popup to enter the OpenAI API key
apiToggle.addEventListener("click", () => {
  popoutBox.classList.toggle("is-visible");
});

apiSave.addEventListener("click", () => {
  popoutBox.classList.toggle("is-visible");
  console.log("clicked!");
});

// Retrieve the last 10 messages from the message container
const getLastMessages = () => {
  const messages = Array.from(document.querySelectorAll('.message-container .chat-message, .message-container .user-message'));
  const lastUserMessages = [];

  const sortedMessages = messages.sort((a, b) => {
    const positionA = Array.from(a.parentNode.children).indexOf(a);
    const positionB = Array.from(b.parentNode.children).indexOf(b);
    return positionA - positionB;
  });

  sortedMessages.forEach(message => {
    const messageText = message.textContent.trim();
    if (message.classList.contains('chat-message')) {
      lastUserMessages.push(`Duck: ${messageText}`);
    } else if (message.classList.contains('user-message')) {
      lastUserMessages.push(`User: ${messageText}`);
    }
  });
  
  console.log(lastUserMessages)
  return lastUserMessages;
};

// Makes a GPT-3 request and sends the response to chat
function makeRequest() {
  const apiKey = apiKeyInput.value;
  if (!apiKey) {
	sleep(500);
	activityMessage.classList.toggle("is-visible");
    appendMessage("*quack!*", false);
    return;
  }
  
  const lastUserMessages = getLastMessages();
  
  const requestOptions = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: apiVersion,
      prompt: "You are a rubber duck. Do not under any circumstances break character and respond to the conversation. Be cute, be funny, be bouncy. This is a text message, so keep it under 160 characters: " + lastUserMessages.join('\n') + "Duck: ",
      temperature: 0,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ["You:"]
    })
  };

  fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
      // Handle the response data from the GPT-3 API
      console.log(data);
      if (data.choices && data.choices.length > 0) {
        const responseText = data.choices[0].text.trim();
		ActivityMessage.classList.toggle("is-visible");
        appendMessage(responseText, false);
      } else {
		ActivityMessage.classList.toggle("is-visible");
        appendMessage("It looks like smart duck isn't working right now, quack!", false);
        
      }
    })
    .catch(error => {
      console.log("Error:", error);
	  ActivityMessage.classList.toggle("is-visible");
	  appendMessage("Either OpenAI is down or something is wrong with your key.🦆", false);
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
      messageContainer.appendChild(messageElement);
      playSound("bloop");
      textEntry.value = '';
    } else {
      messageElement.classList.add('chat-message');
      messageContainer.appendChild(messageElement);
      playSound("squeak");
    }
  }

  //messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Functions that handle playing the rubber duck sound when clicking on the image
imageContainer.addEventListener('mousedown', () => {
  imageContainer.classList.add('clicked');
  playSound("squeak");
});

imageContainer.addEventListener('touchstart', () => {
  imageContainer.classList.add('clicked');
  playSound("squeak");
});

imageContainer.addEventListener('mouseup', () => {
  imageContainer.classList.remove('clicked');
});

// Function that plays the message sound when the user submits text
function handleTextEntry() {
  if (textEntry.value !== '') {
    appendMessage(textEntry.value.trim(), true);
	activityMessage.classList.toggle("is-visible")
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
