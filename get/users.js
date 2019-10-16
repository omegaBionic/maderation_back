var querystring = require('querystring');
var url = require('url');

/* this function is used for get user */
module.exports = {
    getUser : function (db, url, req, res){
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
}
