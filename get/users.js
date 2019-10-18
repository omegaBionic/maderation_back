let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let logger = new Logger("users", "debug")

module.exports = {
  /* this function is used for get user */
  getUser : function (db, url, req, res){
    logger.debug("request received into getUser function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("username: " + params['username']);
    logger.debug("password: " + params['password']);

    /* check username and password */
    if ('username' in params && 'password' in params) {
      let paramsdb = {
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
          logger.info("datas received from database");
          logger.debug(JSON.stringify(data));
          res.setHeader('Content-Type', 'application/json');
          res.json(data);
        }
      });
    }
    return res;
  }
}
