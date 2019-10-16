var querystring = require('querystring');
var url = require('url');

module.exports = {
  /* this function is used for get user */
  getUser : function (db, url, req, res){
    console.log("request received into getUser function.");

    /* parse datas */
    console.log("parse datas.");
    var params = querystring.parse(url.parse(req.url).query);
    console.log("username: " + params['username']);
    console.log("password: " + params['password']);

    /* check username and password */
    if ('username' in params && 'password' in params) {
      var paramsdb = {
        Key: {
        "username": {
        S: params['username']
        }
        },
        TableName: "login_melo"
      };
      /* launch request for username and password */
      db.getItem(paramsdb, function(err, data) {
        if (err){
          console.log(err, err.stack);
        } else {
          console.log("datas received from database: ");
          console.log(data);
          res.setHeader('Content-Type', 'application/json');
          res.json(data);
        }
      });
    }
    return res;
  }
}
