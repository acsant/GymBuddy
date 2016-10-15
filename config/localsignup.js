"use strict";

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function (passport) {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    process.nextTick(function () {
      User.findOne({'local.auth.email': email}, function (err, user) {
        if (err)
          return done(err);
        if (user)
          return done(null, false);

        // Create user object to save fromt the request body
        var newUser = new User();
        newUser.local.auth.email = email;
        newUser.local.email = email;
        newUser.local.first_name = req.body.first_name;
        newUser.local.last_name = req.body.last_name;
        newUser.local.auth.password = newUser.generateHash(password);
        newUser.local.age = req.body.age;
        newUser.local.body_fat = req.body.body_fat;
        newUser.local.bio = req.body.bio;

        newUser.save(function (err) {
          if (err)
            throw err;
          return done(null, newUser);
        });

      });
    });
  }));
};
