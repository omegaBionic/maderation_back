/* class for id gestion */
// TODO json vide mais crée + pas le paramètre id
const fs = require('fs')
let querystring = require('querystring');
const mkdirp = require('mkdirp');
let Logger = require('../utils/logger')
let logger = new Logger("id", "debug")


class Id{
  constructor(){
    logger.debug("Initialize id");
    this.idPath = "resources/";
    this.idName = "id.json";
    this.idFullName = this.idPath + this.idName;
    this.idNumber;
    this.idJsonObject = {};
    this.returnError = "-1";

    /* open write file */
    if (fs.existsSync(this.idFullName)){
      logger.debug("Load if json to object");
      let idStrFile = fs.readFileSync(this.idFullName);
      this.idJsonObject = JSON.parse(idStrFile);
    } else {
      logger.debug("Create resources directory");
      mkdirp(this.idPath);
      logger.debug("Create id file");
      this.writeStream = fs.createWriteStream(this.idFullName);
    }
  }

  checkId(db, url, req, res){
    /* get client id */
    logger.debug("parse datas for get id");
    let params = querystring.parse(url.parse(req.url).query);
    if ("id" in params){
      logger.debug("id found into param");
      this.idNumber = params["id"];
      logger.info("input data id: " + this.idNumber);
    
      /* check if id exist */
      if (this.idNumber in this.idJsonObject){
        logger.debug("idNumber is in json file: OK");
      } else {
        logger.debug("idNumber is in json file: KO");

        let addToJson = '{"' + this.idNumber + '":{"address_client": true, "address_supplier": true, "all": true, "category": true, "chat": true, "client": true, "component": true, "gamme": true, "invoice_quotation": true, "message": true, "product": true, "project": true, "promotion_cat": true, "promotion_comp": true, "quotation": true, "role": true, "shop": true, "status": true, "stock": true, "supplier": true, "users": true}}';
        logger.info("addToJson: '" + addToJson + "'");

        Object.assign(this.idJsonObject, JSON.parse(addToJson))

        fs.writeFileSync(this.idFullName, JSON.stringify(this.idJsonObject));
      }
    } else {
      logger.debug("id not found into param");
    }
  }

  getSyncById(id){
    /* check and return datas from "resources/id.json" */
    logger.debug("getSyncById for: '" + id + "'");
    if (id in this.idJsonObject){
      logger.debug("id found, return this datas: " + JSON.stringify(this.idJsonObject[id]));
      return this.idJsonObject[id];
    } else {
      logger.debug("id not found, return this datas: " + JSON.stringify(this.returnError));
      return this.returnError;
    }
  }
}

module.exports = Id
