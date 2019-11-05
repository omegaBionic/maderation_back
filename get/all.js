/* useless because we can't return request */
// v1
let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let logger = new Logger("all", "debug")

module.exports = {
  /* this function is for get all madera tables */
  getAll : function (db, url, req, res){
    logger.debug("request received into getAll function");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* get all madera tables */
    let allTables = [];
    let maderaTables = [];
    var maderaTableDatas = []
    if ('key' in params) {
      if (params['key'] == "7a1e018840c65325afbac10c7cf07bdf"){
        /* get all tables */
        logger.info("get all tables");
        db.listTables({}, function(err, data) {
          if (err) {
            logger.error("error", err.code);
          } else {
            allTables = data.TableNames;
            logger.info("list of table downloaded");
            logger.debug("table names are: " + allTables);

            logger.debug("sort list of all tables for get only madera table");
            var wordWhoDefineMaderaTables = "madera_";
            for (let i in allTables){
              if (allTables[i].includes(wordWhoDefineMaderaTables)){
                maderaTables.push(allTables[i]);
                logger.debug("allTables[" + i + "]: '" + allTables[i] + "' contains: '" + wordWhoDefineMaderaTables + "'");
              } else {
                logger.debug("allTables[" + i + "]: '" + allTables[i] + "' does not contain: '" + wordWhoDefineMaderaTables + "'");
              }
            }
            logger.debug("maderaTables: " + maderaTables);
            logger.info("maderaTables size: " + maderaTables.length);
          }
      });

      /* launch request get all madera tables */
      logger.info("launch request get all madera tables");
      /* define parameter */
      let paramsdb = {
        TableName: "madera_user"
      };
      /* request dynamodb */
      db.scan(paramsdb, function(err, data) {
        if (err){
          console.log(err, err.stack);
          res.json(data);
        } else {
          logger.info("datas received from database");
          //maderaTableDatas.push({table : data});
          maderaTableDatas.push({tableName : "madera_user", datasTable: data});
          logger.debug("datas return ok for true status");
        }
      /* display and send results */
      logger.debug("maderaTableDatas: " + maderaTableDatas);
      res.setHeader('Content-Type', 'application/json');
      res.send({
        status: true,
        datas: maderaTableDatas
      });
      logger.info("send datas done");
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
// v2
let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let logger = new Logger("all", "debug")

module.exports = {
  /* this function is for get all madera tables */
  getAll : function (db, url, req, res){
    logger.debug("request received into getAll function");

    /* class request dynamoRequest */
    class Dynamodb{
      constructor() {
        this.returnData;
      }
    requestDatas(paramsdb){
      db.scan(paramsdb, function(err, data) {
        if (err){
          console.log(err, err.stack);
          this.returnData = err;
          return this.returnData;
        } else {
          logger.debug("datas received from database");

          this.returnData = data.Items;
          //console.log(this.returnData);
          //console.log("Success: ", data);
          //console.log("this.returnData: ", this.returnData);
          return this.returnData;
        }
      });
    }

    displayResult(){
      console.log("this.returnData: ", this.returnData);
    }
  }

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* get all madera tables */
    let allTables = [];
    let maderaTables = [];
    var maderaTableDatas = []
    if ('key' in params) {
      if (params['key'] == "7a1e018840c65325afbac10c7cf07bdf"){
        /* get all tables */
        logger.info("get all tables");
        db.listTables({}, function(err, data) {
          if (err) {
            logger.error("error", err.code);
          } else {
            allTables = data.TableNames;
            logger.info("list of table downloaded");
            logger.debug("table names are: " + allTables);

            logger.debug("sort list of all tables for get only madera table");
            var wordWhoDefineMaderaTables = "madera_";
            for (let i in allTables){
              if (allTables[i].includes(wordWhoDefineMaderaTables)){
                maderaTables.push(allTables[i]);
                logger.debug("allTables[" + i + "]: '" + allTables[i] + "' contains: '" + wordWhoDefineMaderaTables + "'");
              } else {
                logger.debug("allTables[" + i + "]: '" + allTables[i] + "' does not contain: '" + wordWhoDefineMaderaTables + "'");
              }
            }
            logger.debug("maderaTables: " + maderaTables);
            logger.info("maderaTables size: " + maderaTables.length);
          }
                /* launch request get all madera tables */
      logger.info("launch request get all madera tables");

      /* define parameter */
      let paramsdb = {
        TableName: "madera_user"
      };
      logger.debug("paramsdb defined to: '" + "madera_user" + "' table");

      /* request dynamodb */
      dynamodb = new Dynamodb();
      console.log("aaaa");
      console.log(dynamodb.requestDatas(paramsdb));
      console.log("bbbb");

      /* display and send results */
      dynamodb.displayResult();
      maderaTableDatas.push({tableName : "madera_user", datasTable : dynamodb.returnData});
      logger.debug("maderaTableDatas: " + dynamodb.returnData);
      res.setHeader('Content-Type', 'application/json');
      res.send({
        status: true,
        datas: maderaTableDatas
      });
      logger.info("send datas done");
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
