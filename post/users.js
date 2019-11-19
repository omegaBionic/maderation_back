let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let json = require('../utils/json')
let logger = new Logger("usersPost", "debug")

module.exports = {
  /* this function is used for get users */
  postUser : function (db, url, req, res){
    logger.debug("request received into getusers function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check key and check datas */
    if ('key' in params && 'datas' in params) {
      if (params['key'] == "993b06009dce6a9962esecf49801d32e"){
        /* check if params['datas'] is json */
        if (json.isJson(params['datas'])){
            
            // TODO: check is item exist into database
            
            /* insert/push datas into dynamodb */
            let datasJson = JSON.parse(params['datas'])
            let paramsdb = {
                TableName: "madera_user",
                Item: datasJson
            };

            db.putItem(paramsdb, function(err, data) {
                if (err){
                  console.log(err, err.stack);
                  res.json(data);
                } else {
                  logger.info("datas pushed into database");
                  res.setHeader('Content-Type', 'application/json');
                  res.status(200).send({
                    status: 200,
                    datas: 'datas pushed into database'
                  });
                  logger.debug("datas insert into ");
                }
              });
        } else {
            logger.info("datas is not an json");
            res.setHeader('Content-Type', 'application/json');
            res.status(500).send({
              status: 500,
              datas: 'Error: datas is not an json'
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