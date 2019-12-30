let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let logger = new Logger("address_client", "debug")

module.exports = {
  /**
  * getAddressClient module.
  * @module get/address_client
  * @param {object} db - db from dynamodb format.
  * @param {object} url - url from request.
  * @param {object} req - request full.
  * @param {object} res - result from request.
  * @return {json} return sended value and status.
  */
  getAddressClient : function (db, url, req, res){
    logger.debug("request received into getaddressClient function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check addressClient and password */
    if ('key' in params) {
      if (params['key'] == "28e60ed41c0a59a442cade866bff3a97"){
        let paramsdb = {
          TableName: "madera_address_client"
        };
        /* launch request for addressClient and password */
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
