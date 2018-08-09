var express = require('express');
var router = express.Router();

// GET homepage
router.get('/', (req, res) => {
  res.render("login");
});

// POST login from homepage
router.post('/', (req, res) => {
  res.cookie("character", req.body.character);
  return res.redirect("/chat");
});

// GET chat page
router.get('/chat', (req, res) => {
  if (req.cookies.character) {
    const locals = { "character": req.cookies.character };
    // socket.io conenction happens on this page from app.js
    return res.render("app", locals);
  } else {
    return res.redirect("/");
  }
});

module.exports = router;
