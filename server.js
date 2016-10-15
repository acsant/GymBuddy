"use strict";

var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var dbconfig = require('./config/database.js');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();

// Setup the port
app.set( 'port', ( process.env.PORT || 8080 ) );

// Create a connection to the database
mongoose.connect( dbconfig.url );

// Configure parser for both JSON and url-encoded requests
app.use( bodyparser.urlencoded( {extended: true} ) );
app.use( bodyparser.json() );
app.use( session({secret: 'gymbuddysecret'}) );

// Initialize passport
app.use( passport.initialize() );
app.use( passport.session() );

require('./config/passport_init')( passport );

// Import routes
require('./routes/routes.js')( app, passport );

app.listen( app.get('port'), function (error) {
  if ( error ) {
    console.error( error );
  } else { 
    console.info("Listening to port %s. Direct all requests at " + 
        "http://localhost:%s/ in your browser",app.get('port'), app.get('port'));
  }
} );
