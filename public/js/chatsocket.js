const socket = io();


// TODO: Kill the jQuery
$(function () {
    $('form.socket').submit(function(){
      socket.emit('chat message', `${getCookie("character")} said: ${$('#messageInput').val()}`);
      $('#messageInput').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
  });

function getCookie(cookieName) {
  let i, x, y, allCookies = document.cookie.split(";");
  for (i = 0; i < allCookies.length; i++) {
    x = allCookies[i].substring(0, allCookies[i].indexOf("="));
    y = allCookies[i].substring(allCookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x === cookieName) {
      return decodeURI(y);
    }
  }
}
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
