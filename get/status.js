/* get status with this command : madera-api.maderation.net/api/get/status?key=179616f1a4cecab2a7eab481b84d076c */
/* return code */
/* badkey: {"status":false,"message":"not_authorized"} /API/get/status?key=wtfkey */
/* fail to connect dynamodb: {"status":false,"datas":"Error: BDD error"} */
/* all is OK: {"status":true,"datas":"key: OK, dynamodb: OK"}*/

let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let logger = new Logger("status", "debug")
let isAllowed = false; 
const secureKey = '179616f1a4cecab2a7eab481b84d076c';

module.exports = {
  /**
  * getStatus module.
  * @module get/status
  * @param {object} db - db from dynamodb format.
  * @param {object} url - url from request.
  * @param {object} req - request full.
  * @param {object} res - result from request.
  * @return {json} return sended value and status.
  */
  getStatus : function (db, url, req, res){
    logger.debug("check api status");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check if it's good key */
    logger.debug("check key");
    if ('key' in params) {
        if (params['key'] == secureKey){
            logger.info("accepted key");
            isAllowed = true;
        } else {
            logger.info("not_authorized");
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({
                    status: 500,
                    datas: 'Error: bad key'
                });
            logger.debug("sended to client: not_authorized because bad key");
            isAllowed = false;
        }
    } else {
        logger.info("not_authorized, bad parameter");
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send({
            status: 500,
            datas: 'Error: bad parameter'
        });
        logger.debug("sended to client: not_authorized because bad parameter");
        isAllowed = false;
    }

    /* check database status */
    if (isAllowed){
    logger.debug("check database status");
    let paramsdb = {
            TableName: "madera_role",
            Limit : 1
    };

    db.scan(paramsdb, function(err, data) {
        if (err) {
            logger.fatal("Error: BDD error");
            res.setHeader('Content-Type', 'application/json');
            res.status(500).send({
              status: 500,
              datas: 'Error: BDD error'
            });
        } else {
            logger.info("database: OK")
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send({
              status: 200,
              datas: 'OK'
            });
        }
    });
    }
    return res;
  }
}
