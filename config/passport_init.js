"use strict";
var User = require('../models/user');
var Gym = require('../models/gym');
var locallogin = require('./locallogin');
var localsignup = require('./localsignup');

module.exports = function ( passport ) {
  // Serialize a user 
  passport.serializeUser( function(user, done) {
    done(null, user._id);
  });

  // Deserialize a user by id
  passport.deserializeUser(function (id, done) {
    User.findById(_id, function (err, user) {
      done(err, user);
    });
  });
  
  locallogin( passport );
  localsignup( passport );
};
