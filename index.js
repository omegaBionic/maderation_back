var users = require('./get/users');

var express = require('express');
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var AWS = require('aws-sdk');

var app = express();

var db = new AWS.DynamoDB({'region': 'eu-west-3'});

app.get('/API/getUser', function(req, res) {
  res = users.getUser(db, url, req, res)
})
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});


app.listen(8080);
