"use strict";
var mongoose = require('mongoose');

var user-gymSchema = mongoose.Schema({
  _user_id: String,
  _gym_id: String,
});

module.exports = mongoose.model( 'User-Gym', user-gymSchema );
