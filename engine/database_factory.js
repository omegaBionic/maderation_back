/* FACTORY for all Databases */
let Logger = require('../utils/logger')
let logger = new Logger("database_factory", "debug")
let AWS = require('aws-sdk');


class DatabaseFactory{
  constructor(dataBaseType){
    
    this.dataBaseType = dataBaseType

    switch(this.dataBaseType){
        case "aws":
            /* aws connection */
            this.AWS = require('aws-sdk');
            logger.debug("open amazon bdd")
            this.db = new AWS.DynamoDB({'region': 'eu-west-3'});
            logger.info("aws bdd connexion is ready")
            break;
        default:
            logger.error("bad dataBaseType into database_factory.")
            break;
    }
  }

    get(inputJson){
        // TODO get
        logger.error("constructor: bad dataBaseType into database_factory.")
        return 1
    }

    /* add data into database */
    add(inputJson, table){
        let returnStatus = 0
        switch(this.dataBaseType){
            case "aws":
                /* insert/push datas into dynamodb */
                let datasJson = JSON.parse(params['datas'])
                let paramsdb = {
                    TableName: "madera_user",
                    Item: datasJson
                };

                this.db.putItem(paramsdb, function(err, data) {
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
                    returnStatus = 200
                    break;
            default:
                logger.error("add: bad dataBaseType into database_factory.")
                returnStatus = 500
                break;
        }
        return returnStatus
    }

    modify(inputJson){
        // TODO modify
        return 1
    }

    delete(inputJson){
        // TODO delete
        return 1
    }
  
}
module.exports = DatabaseFactory
