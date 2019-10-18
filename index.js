/* REQUIREMENTS */
let users = require('./get/users');
let Logger = require('./utils/logger')
let logger = new Logger("index", "debug")
// TODO change let to let

/* MODULS AND SETUP */
let express = require('express');
let http = require('http');
let url = require('url');
let querystring = require('querystring');

/* start the http listening server */
let app = express();
app.listen(8080);

/* aws connection */
let AWS = require('aws-sdk');
let db = new AWS.DynamoDB({'region': 'eu-west-3'});

/* getUser() */
app.get('/API/getUser', function(req, res) {
  res = users.getUser(db, url, req, res)
})

/* if bad answer by getUser() */
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});
