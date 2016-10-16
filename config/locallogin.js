"use strict";
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function ( passport ) {
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // Find a user by email 
  function ( req, email, password, done ) {
    console.log("Entering login");
    process.nextTick(function () {
      User.findOne({'local.auth.email': email}, function (err, user) {
        if (err)
          return done(err);

        console.log(password);
        console.log(user.isValidPassword(password));
        if ( user && user.isValidPassword( password ) ) {
          console.log("valid password");
          return done(null, user);
        }
        console.log("Auth fail");
        return done(null, false);
      });
    });
  }));
};
