var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
    character: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
});

// authenticate input against database documents
UserSchema.statics.authenticate = function(character, password, callback) {
  User.findOne({ "character": character })
      .exec(function (error, user) {
        if (error) {
          return callback(error);
        } else if ( !user ) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password , function(error, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
}

// character already exists? TODO: this
UserSchema.statics.characterCheck = function(character, callback){
  User.findOne({"character": character}, function(err, character){
    // Handle generic errors
    if (err){
      // Just send back the error if there is one
      return callback(err, null);
    } else if (character){
      // Then see if a character was returned from the search
      // If yes, return it. Callback in routes/index.js will handle the logic from there
      return callback (null, character);
    } else {
      // Otherwise, return no error and no character information.
      return callback (null, null);
    }
  });
}

// hash password before saving to database
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
