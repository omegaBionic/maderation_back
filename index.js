/* REQUIREMENTS */
let users = require('./get/users');
let status = require('./get/status')
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

/* /API/get/status */
app.get('/api/get/status', function(req, res) {
  res = status.getStatus(db, url, req, res)
})

/* if bad answer not found 404 */
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});
