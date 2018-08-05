const socket = io();

// TODO: Kill the jQuery
$(function () {
    $('form.socket').submit(function(){
      socket.emit('chat message', $('#messageInput').val());
      $('#messageInput').val('');
      return false;
    });
  });

// TODO: This was refreshing the page for some reason instead of actually emitting the message
// const chatForm = document.querySelector("form.socket");
// const chatSendButton = document.querySelector("button.socket");
// const chatInput = document.querySelector("input.socket");
//
// function chatMessage() {
//   socket.emit("chat message", chatInput.value);
//   chatInput.value = "";
//   return false;
// }
//
// chatForm.addEventListener("submit", chatMessage);
