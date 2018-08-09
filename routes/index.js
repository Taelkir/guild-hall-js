const express = require('express');
const router = express.Router();
const User = require("../models/user");

// GET homepage
router.get('/', (req, res) => {
  let locals = {};
  if (req.cookies.created){
    locals = {message: "You just created a character! Now you can log in."}
  }
  res.render("login", locals);
});

// POST login from homepage
router.post('/', (req, res, next) => {
  if (req.body.character && req.body.loginPassword) {
    User.authenticate(req.body.character, req.body.loginPassword, function (error, user) {
      if (error || !user) {
        var err = new Error("That character doesn't exist, or you entered the wrong password for that character.");
        err.status = 401;
        return next(err);
      }  else {
        // req.session.userId = user._id;
        res.cookie("character", req.body.character);
        return res.redirect("/chat");
      }
    });
  } else {
    var err = new Error('Character Name and Password are required. Did you miss one of the fields?');
    err.status = 401;
    return next(err);
  }

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

// POST /new-character
router.post("/new-character", (req, res, next) => {
  // Does the character already exist?
  User.characterCheck(req.body.character, function(error, user){
    if (error){
      return next(error);
    } else if (user) {
      console.log("Found character")
      var err = new Error("That character name already exists. You can log in if you know the password.");
      err.status = 401;
      return next(err);
    } else if (!user) {
      console.log("Didn't find character");
    }
  });
  // put those bad boys in the db
  if (req.body.newCharacter &&
    req.body.newPassword &&
    req.body.confirmPassword) {
      console.log("Yep, got all three inputs")
      // confirm that user typed same password twice
      if (req.body.newPassword !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }
      console.log("Yep, passwords matched");

      // create object with form input
      console.log(`
        character: ${req.body.newCharacter},
        password: ${req.body.newPassword},

        `);

      var userData = {
        character: req.body.newCharacter,
        password: req.body.newPassword,
      };

      // use schema's `create` method to insert document into Mongo
      var user = new User(userData);
      user.save(function (error, user) {
        if (error) {
          return next(error);
        } else {
          // redirect so they can log in
          res.cookie("created", true);
          console.log("Yep, details sent to mongoose and redirecting")
          return res.redirect("/");
        }
      });

    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
})

module.exports = router;
