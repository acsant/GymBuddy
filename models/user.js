"use strict";
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    auth: {
      email: { type: String, unique: true, required: true, dropDups: true },
      password: String,
    },
    _id: String,
    first_name: String,
    last_name: String,
    phone_num: Number,
    age: Number,
    weight: Number,
    body_fat: Number,
    bio: String,
    objectives: [ String ],
    matches: [{ type: mongoose.Schema.ObjectId, unique: true, dropDups: true, ref: 'User' }],
    gym_address: String,
    gym_code: String
  }
});

userSchema.methods.generateHash = function ( password ) {
  return bcrypt.hashSync( password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.isValidPassword = function ( password ) {
  return bcrypt.compareSync( password, this.local.auth.password );
};

var User = mongoose.model( 'User', userSchema );
module.exports = User;
