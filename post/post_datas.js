let querystring = require('querystring');
let url = require('url');
let json = require('../utils/json')
let Logger = require('../utils/logger')
let logger = new Logger("postDatas", "debug")

module.exports = {
    /* this function is used for get users */
    postDatas : function (dataBase, url, req, res){
    logger.debug("request received into getusers function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check key and check datas */
    if ('key' in params) {
      if (params['key'] == "993b06009dce6a9962esecf49801d32e"){
        /* get and parse body to jsonBody */
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
          if (json.isJson(body)){ // check data integrity
            logger.debug("inputJson is in json format");
            let jsonBody = JSON.parse(body)
            for( item in jsonBody ) {
                    console.info("parse bodyJson");
                    console.debug("item: '" + item + "'");
                    console.debug("jsonBody[item].status: '" + jsonBody[item].status + "'");
                    console.debug("jsonBody[item].table: '" + jsonBody[item].table + "'");
                    console.debug("jsonBody[item].values: '" + JSON.stringify(jsonBody[item].values) + "'");
                    switch(jsonBody[item].status){
                        case 'add':
                            let returnStatus = dataBase.add(jsonBody[item].table, jsonBody[item].values)
                            logger.debug("returnStatus: " + returnStatus);

                            res.setHeader('Content-Type', 'application/json');
                            res.status(returnStatus[1]).send({
                                status: returnStatus[1],
                                datas: returnStatus[0]
                            });
                            break;
                        case 'modify':
                            logger.debug("into modify case");
                            break;
                        case 'delete':
                            logger.debug("into delete case");
                            break;
                        default:
                            logger.info("bad status request into json");
                            break;
                    }
            }
        } else {
            logger.info("inputJson is not in json format");
            res.setHeader('Content-Type', 'application/json');
            res.status(500).send({
                status: 500,
                datas: 'inputJson is not in json format'
            });
        }
        });

            /* insert/push datas into dynamodb */
            // let datasJson = JSON.parse(params['datas'])
            // let paramsdb = {
            //     TableName: "madera_user",
            //     Item: datasJson
            // };

            // db.putItem(paramsdb, function(err, data) {
            //     if (err){
            //       console.log(err, err.stack);
            //       res.json(data);
            //     } else {
            //       logger.info("datas pushed into database");
            //       res.setHeader('Content-Type', 'application/json');
            //       res.status(200).send({
            //         status: 200,
            //         datas: 'datas pushed into database'
            //       });
            //       logger.debug("datas insert into ");
            //     }
            //   });

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
