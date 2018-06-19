const app = require("express")();
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

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
app.listen(1337, () => {
  console.log("Server is running.")
});


/* Notes / TODO
**
** Serve a page that sends post requests to the server
**
** Server renders the text and a link to an icon and passes it back
**
** https://socket.io/get-started/chat/ socket probably a good package for then showing it to other users
**
** Cannibalise this? https://socket.io/get-started/chat/
**
*/
