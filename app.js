// Requires
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const session = require('express-session')

// Variables
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('static'))

app.set('view engine', 'pug');

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/bookworm");
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));


// GET homepage
app.get('/', (req, res) => {
  res.render("login");
});

// POST login from homepage
app.post('/', (req, res) => {
  res.cookie("character", req.body.character);
  return res.redirect("/chat");
});

// GET chat page
app.get('/chat', (req, res) => {
  if (req.cookies.character) {
    const locals = { "character": req.cookies.character };
    // socket.io conenction
    return res.render("app", locals);
  } else {
    return res.redirect("/");
  }
});

io.on('connection', function(socket){
  // Connect / Disconnect logs
  console.log('a user connected');
  socket.on("disconnect", function(){
    console.log("user disconnected");
  });
  // Message handling
  socket.on("chat message", (msg) => {
    console.log(`Message: ${msg}`)
    io.emit("chat message", msg);
  });
});

// Load up the server
http.listen(port, () => {
  console.log(`Server is running on port:${port}.`)
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
