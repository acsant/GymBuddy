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
    process.nextTick(function () {
      User.findOne({'local.auth.email': email}, function (err, user) {
        if (err)
          return done(err);

        if ( user && user.isValidPassword( password ) )
          return done(null, user);

        return done(null, false);
      });
    });
  }));
};
