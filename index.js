const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'pug');

// Serve a page
app.get('/', (req, res) => {
  res.render("app");
});

// React to post requests coming in
app.post('/', (req, res) => {
  console.dir(req.body);
  res.render("app");
});


// Load up the server
app.listen(1337, () => {
  console.log("Server is running.")
});


/* Notes / TODO
**
** Serve a page that sends post requests to the server
**
** Server renders the text and passes it back to the page
**
** https://socket.io/get-started/chat/ socket probably a good package for then showing it to other users
**
** Cannibalise this? https://socket.io/get-started/chat/
**
*/
