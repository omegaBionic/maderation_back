var querystring = require('querystring');
var url = require('url');

/* this function is used for get user */
module.exports = {
  getUser : function (db, url, req, res){
    console.log("request received into getUser function.");
    var params = querystring.parse(url.parse(req.url).query);
    console.log("username: " + params['username']);
    console.log("password: " + params['password']);

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
        } else {// an error occurred
          console.log("datas received from database: ");
          console.log(data);
          res.setHeader('Content-Type', 'application/json');
          res.json(data);
        }// successful response
      });
    }
    return res;
  }
}
