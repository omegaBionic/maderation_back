/* REQUIREMENTS */
let users = require('./get/users');
let client = require('./get/client');
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

/* /api/get/status */
app.get('/api/get/status', function(req, res) {
  res = status.getStatus(db, url, req, res)
})

/* /api/get/user */
app.get('/api/get/user', function(req, res) {
  res = users.getUser(db, url, req, res)
})

/* /api/get/client */
app.get('/api/get/client', function(req, res) {
  res = client.getClient(db, url, req, res)
})

/* if bad answer not found 404 */
.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  res.status(404).send({
    status: 404,
    datas: 'page not found'
  });
});
