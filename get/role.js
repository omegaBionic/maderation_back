let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let logger = new Logger("role", "debug")

module.exports = {
  /* this function is used for get role */
  getRole : function (db, url, req, res){
    logger.debug("request received into getrole function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check role and password */
    if ('key' in params) {
      if (params['key'] == "33f85cb0c62f522f5c2ad09067c5e83a"){
        let paramsdb = {
          TableName: "madera_role"
        };
        /* launch request for role and password */
        db.scan(paramsdb, function(err, data) {
          if (err){
            console.log(err, err.stack);
            res.json(data);
          } else {
            logger.info("datas received from database");
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send({
              status: 200,
              datas: data
            });
            logger.debug("datas return ok for true status");
          }
        });
      } else { // if bad key
        logger.info("bad bad_key.");
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send({
          status: 500,
          datas: 'Error: bad key'
        });
      }
    } else { // if bad parameter
      logger.info("bad bad_parameter.");
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({
        status: 500,
        datas: 'Error: bad parameter'
      });
    }
    return res;
  }
}
