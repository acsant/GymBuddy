"use strict";
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    auth: {
      email: String,
      password: String,
    },
    _id: String,
    first_name: String,
    last_name: String,
    age: Number,
    weight: Number,
    body_fat: Number,
    bio: String,
  }
});

userSchema.methods.generateHash = function ( password ) {
  return bcrypt.hashSync( password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.isValidPassword = function ( password ) {
  return bcrypt.compareSync( password, this.local.auth.password );
};

module.exports = mongoose.model( 'User', userSchema );
