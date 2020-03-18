let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let logger = new Logger("promotionCat", "debug")

module.exports = {
  /**
  * getPromotionCat module.
  * @module get/promotion_cat
  * @param {object} db - db from dynamodb format.
  * @param {object} url - url from request.
  * @param {object} req - request full.
  * @param {object} res - result from request.
  * @return {json} return sended value and status.
  */
  getPromotionCat : function (db, url, req, res){
    logger.debug("request received into getpromotionCat function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check promotionCat and password */
    if ('key' in params) {
      if (params['key'] == "557c0271e30cf474e0f46f93721fd1ba"){
        let paramsdb = {
          TableName: "madera_promotion_cat"
        };
        /* launch request for promotionCat and password */
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
