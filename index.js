var express = require('express');
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var AWS = require('aws-sdk');

var app = express();

var db = new AWS.DynamoDB({'region': 'eu-west-3'});

/* this function is used for get users */
function getUsers(req, res){
  var params = querystring.parse(url.parse(req.url).query);
  console.log(params['username']);
  console.log(params['password']);

  if ('username' in params && 'password' in params) {
    var paramsdb = {
      Key: {
      "username": {
        S: params['username']
        }
      },
      TableName: "login_melo"
    };
    db.getItem(paramsdb, function(err, data) {
      if (err){
        console.log(err, err.stack);
      }// an error occurred
      else {
        console.log(data);
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
      }        // successful response
    });
  }
  return res;
}

app.get('/API/getUser', function(req, res) {
  res = getUsers(req, res)
})
.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});


app.listen(8080);
