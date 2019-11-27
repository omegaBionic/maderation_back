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
    add(table, datasJson){
        let returnStatus = 500
        let returnMessage = ""

        /* insert and push datas into dynamodb */
        switch(this.dataBaseType){
            case "aws":
                let paramsdb = {
                    TableName: table,
                    Item: datasJson
                };
                this.db.putItem(paramsdb, function(err, data) {
                    if (err){
                        returnStatus = 500
                        returnMessage = "problem for push json into database: '" + err + "'"
                        logger.error(returnMessage);
                    } else {
                        returnStatus = 200
                        returnMessage = "datas pushed into database"
                        logger.info(returnMessage);
                    }
                });
                break;
            default:
                returnStatus = 500
                returnMessage = "add: bad dataBaseType into database_factory."
                logger.error(returnMessage)
                break;
        }
        return [returnMessage, returnStatus]
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
