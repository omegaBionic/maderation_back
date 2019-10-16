/* REQUIREMENTS */
var users = require('./get/users');

/* MODULS AND SETUP */
var express = require('express');
var http = require('http');
var url = require('url');
var querystring = require('querystring');

/* start the http listening server */
var app = express();
app.listen(8080);

/* aws connection */
var AWS = require('aws-sdk');
var db = new AWS.DynamoDB({'region': 'eu-west-3'});

/* getUser() */
app.get('/API/getUser', function(req, res) {
  res = users.getUser(db, url, req, res)
})

/* if bad answer by getUser() */
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});