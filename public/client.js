const socket = io()
let name;
let textarea = document.getElementById('textarea')
let messageArea = document.querySelector('.message__area')
do {
 name = prompt('Please enter your name')
} while(!name)

textarea.addEventListener('keyup', (event) => {
 if (event.key === 'Enter') {
  sendMessage(event.target.value)
 }
})

function sendMessage(msg) {
 let message = {
  user: name,
  message: msg.trim()
 }
 appendMessage(message, 'outgoing')
 textarea.value = ''

 // send server
 socket.emit('message', message)

}

function appendMessage(msg, type) {
 let mainDiv = document.createElement('div')
 let className = type
 mainDiv.classList.add(className, 'message')
 let markup = `
 <h4>${msg.user}</h4>
 <p>${msg.message}</p>
 `
 mainDiv.innerHTML = markup
 messageArea.appendChild(mainDiv)
 scrollToBottom()
}

// Receive msg

socket.on('message', (msg) => {
 appendMessage(msg, 'incoming')
})

function scrollToBottom() {
 messageArea.scrollTop = messageArea.scrollHeight
}