"use strict";
var mongoose = require('mongoose');

var registeredGym = mongoose.Schema({
  _id: String,
  common_name: String,
  location: String,
});

module.exports = mongoose.model( 'Gym', registeredGym );
