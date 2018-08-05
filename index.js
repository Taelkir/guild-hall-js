// Requires
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Variables
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('static'))

app.set('view engine', 'pug');

// Serve a page
app.get('/', (req, res) => {
  res.render("login");
});

app.get('/chat', (req, res) => {
  if (req.cookies.character) {
    const locals = { "character": req.cookies.character };
    return res.render("app", locals);
  } else {
    return res.redirect("/");
  }
});

// React to post requests coming in
app.post('/', (req, res) => {
  res.cookie("character", req.body.character);
  return res.redirect("/chat");
});

app.post('/chat', (req, res) => {
  res.cookie("character", req.body.character);
  return res.redirect("/chat");
});

// Load up the server
app.listen(port, () => {
  console.log(`Server is running on ${port}.`)
});


/* Notes / TODO
**
** Login to a single chat area
**
** Create characters
**  Store name in database
**  Store url to icon in database
** https://socket.io/get-started/chat/ socket probably a good package for then showing it to other users
**
** Cannibalise this? https://socket.io/get-started/chat/
**
*/
