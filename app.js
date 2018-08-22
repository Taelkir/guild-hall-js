// Requires
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const session = require('express-session');

// Variables
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/guildhall";


app.set('view engine', 'pug');

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true });
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log(`Successfully connected to mongoose`);
});

// Socket.io
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

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'))

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// 404 handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler, needs to be last
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
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
**
**
*/
