const socket = io();

;(function () {

  const chatForm = document.querySelector("form.socket");
  const chatSendButton = document.querySelector("button.socket");
  const chatInput = document.querySelector("input.socket");
  const messageList = document.querySelector("#messages");

  function chatMessage(event) {
    event.preventDefault();
    if (chatInput.value) {
      // Send the message off to the socket, if there is a message
      socket.emit("chat message", `${getCookie("character")} said: ${chatInput.value}`);

      // Clear the input, put the cursor there, scroll down to the new message
      chatInput.value = "";
      chatInput.focus();
    }
  }

  function receiveChatMessage(message) {
    // Called when the socket notices a new message

    // Build the element for the message
    let newMessageElement = document.createElement("li");
    let newMessageText = document.createTextNode(message);

    // Pack the new element onto the page
    newMessageElement.appendChild(newMessageText);
    messageList.appendChild(newMessageElement);

    // Scroll to show the message (needs to be improved because new messages prevent users from scrolling up and viewing the history of the chat)
    messageList.scrollTop = messageList.scrollHeight;
  }

  chatForm.addEventListener("submit", chatMessage);
  socket.on("chat message", receiveChatMessage);

})();

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
