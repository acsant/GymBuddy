"use strict";

var express = require('express');
var bodyparser = require('body-parser');
var app = express();

// Setup the port
app.set( 'port', ( process.env.PORT || 8080 ) );

// Configure parser for both JSON and url-encoded requests
app.use( bodyparser.urlencoded( {extended: true} ) );
app.use( bodyparser.json() );

app.listen( app.get('port'), function (error) {
  if ( error ) {
    console.error( error );
  } else { 
    console.info("Listening to port %s. Direct all requests at " + 
        "http://localhost:%s/ in your browser",app.get('port'), app.get('port'));
  }
} );
