let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let logger = new Logger("users", "debug")
let Token = require('../utils/token')

module.exports = {
  /* this function is used for get user */
  getUser : function (db, url, req, res){
    let token = new Token("omegaToken");

    logger.debug("request received into getUser function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check username and password */
    if ('key' in params) {
      if (params['key'] == "83c2c07ea1251a1a39ec46d52cbba19c"){
        let paramsdb = {
          TableName: "madera_user"
        };
        /* launch request for username and password */
        db.scan(paramsdb, function(err, data) {
          if (err){
            console.log(err, err.stack);
            res.json(data);
          } else {
            logger.info("datas received from database");
            res.setHeader('Content-Type', 'application/json');
            res.send({
              status: true,
              datas: data
              });
            logger.debug("datas return ok for true status");
          }
        });
      } else { // if bad key
        logger.info("bad bad_key.");
        res.send({
          status: false,
          datas: 'Error: bad_key'
          });
      }
    } else { // if bad parameter
      logger.info("bad bad_parameter.");
      res.send({
        status: false,
        datas: 'Error: bad_parameter'
        });
    }
    return res;
  }
}
