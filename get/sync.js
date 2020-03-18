let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let logger = new Logger("sync", "debug")

module.exports = {
  /**
  * getSync module.
  * @module get/sync
  * @param {object} db - db from dynamodb format.
  * @param {object} url - url from request.
  * @param {object} req - request full.
  * @param {object} res - result from request.
  * @return {json} return sended value and status.
  */
  getSync : function (id, db, url, req, res){
    logger.debug("request received into getSync function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check sync and password */
    if ('key' in params) {
      if (params['key'] == "03f1ce90995780a5c6fe80eacccfb080"){
        if ('id' in params){
            /* get values from id.json with id param */
            let returnJsonSyncDatas = id.getSyncById(params['id']);

            if (returnJsonSyncDatas == "-1"){ // -1 == return code error
                /* return bad value */
                res.setHeader('Content-Type', 'application/json');
                res.status(404).send({
                    status: 404,
                    datas: "{data: id not found}"
                });
            } else { // return json sync data
                /* return bad value */
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({
                    status: 200,
                    datas: returnJsonSyncDatas
                });
            }
        } else {
            logger.info("bad id.");
            res.setHeader('Content-Type', 'application/json');
            res.status(500).send({
                status: 500,
                datas: 'Error: id'
            });
        }
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
