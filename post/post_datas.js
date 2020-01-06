let querystring = require('querystring');
let url = require('url');
let json = require('../utils/json')
let Logger = require('../utils/logger')
let logger = new Logger("postDatas", "debug")

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const removeItem = (items, i) =>
  items.slice(0, i-1).concat(items.slice(i, items.length))

module.exports = {
  /**
  * postDatas module.
  * @module post/postDatas
  * @param {object} db - db from dynamodb format.
  * @param {object} url - url from request.
  * @param {object} req - request full.
  * @param {object} res - result from request.
  * @param {object} id - requester's id.
  * @return {json} return sended value and status.
  */
  postDatas: function (db, url, req, res, id) {
    /* The title of the book. */
    logger.debug("request received into getusers function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check key and check datas */
    if ('key' in params) {
      if (params['key'] == "993b06009dce6a9962esecf49801d32e") {
        /* get and parse body to jsonBody */
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
          if (json.isJson(body)) { // check data integrity
            logger.debug("inputJson is in json format");
            let jsonBody = JSON.parse(body)
            for (item in jsonBody) { // TODO remove console logger -> use custom logger
              logger.info("parse bodyJson");
              logger.debug("item: '" + item + "'");
              logger.debug("jsonBody[item].status: '" + jsonBody[item].status + "'");
              logger.debug("jsonBody[item].table: '" + jsonBody[item].table + "'");
              logger.debug("jsonBody[item].values: '" + JSON.stringify(jsonBody[item].values) + "'");
              let paramsdb = {}
              switch (jsonBody[item].status) {
                case 'add':
                  /* add datas into dynamodb */
                  logger.debug("into add case");
                  paramsdb = {
                    TableName: jsonBody[item].table,
                    Item: jsonBody[item].values
                  };

                  db.putItem(paramsdb, function (err, data) {
                    if (err) {
                      logger.info(err, err.stack);
                      logger.error("err: '" + err.stack + "' - '" + err.stack + "'");
                      //res.json(data);
                    } else {
                      logger.info("datas pushed into database");
                    }
                  });
                  break;
                case 'delete':
                  /* delete datas into dynamodb */
                  logger.debug("into delete case");
                  if (jsonBody[item].table == "madera_user"){ // for delete param you need to add ONLY id parameter
                    logger.debug("jsonBody[item].values.username: '" + JSON.stringify(jsonBody[item].values.username) + "'");
	                  paramsdb = {
	                    TableName: jsonBody[item].table,
	                    Key: {
                        "username": jsonBody[item].values.username
                      }
                    };
	                  db.deleteItem(paramsdb, function (err, data) {
	                  if (err) {
                      logger.error("err: '" + err.stack + "' - '" + err.stack + "'");
	                    } else {
	                      logger.info("datas delete from database");
	                    }
	                  });
                  } else { // else other than madera_user table
                    /* generate id key*/
                    let splitedTable = jsonBody[item].table.split('_')
                    logger.debug("splitedTable: " + splitedTable);

                    splitedTable = removeItem(splitedTable, 1)
                    logger.debug("splitedTable: " + splitedTable);

                    let tableId = ""
                    splitedTable.forEach(element => tableId = tableId + element.capitalize());
                    logger.debug("tableId: " + tableId);

                    tableId = "id" + tableId
                    logger.debug("tableId: " + tableId);

                    let fullKey = '{"' + tableId + '": ' + JSON.stringify(jsonBody[item].values[tableId]) + "}"
                    console.log(fullKey)
                    fullKey = JSON.parse(fullKey)
                    console.log(fullKey)
                    jsonBody[item].table,
	                  paramsdb = {
	                    TableName: jsonBody[item].table,
	                    Key: fullKey
                    };
	                  db.deleteItem(paramsdb, function (err, data) {
	                  if (err) {
                        logger.error("err: '" + err.stack + "' - '" + err.stack + "'");
	                    } else {
	                      logger.info("datas delete from database");
	                    }
	                  });
                  }
                  break;
                  case 'modify':
                    /* modify datas into dynamodb */
                    logger.debug("into modify case");
                    paramsdb = {
                      TableName: jsonBody[item].table,
                      Item: jsonBody[item].values
                    };
                    db.putItem(paramsdb, function (err, data) {
                      if (err) {
                        logger.info(err, err.stack);
                        logger.error("err: '" + err.stack + "' - '" + err.stack + "'");
                        //res.json(data);
                      } else {
                        logger.info("datas pushed into database");
                      }
                    });
                  break;
                default:
                  logger.info("bad status request into json");
                  break;
              }
              /* update id.json for sync */
              id.setTableStatus(jsonBody[item].table, false)
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send({
              status: 200,
              datas: 'datas pushed into database'
            });
          } else {
            logger.info("inputJson is not in json format");
            res.setHeader('Content-Type', 'application/json');
            res.status(500).send({
              status: 500,
              datas: 'inputJson is not in json format'
            });
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
