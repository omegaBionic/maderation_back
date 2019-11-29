/* class for id gestion */

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

        let addToJson = '{"' + this.idNumber + '":{"madera_address_client": true, "madera_address_supplier": true, "madera_all": true, "madera_category": true, "madera_chat": true, "madera_client": true, "madera_component": true, "madera_gamme": true, "madera_invoice_quotation": true, "madera_message": true, "madera_product": true, "madera_project": true, "madera_promotion_cat": true, "madera_promotion_comp": true, "madera_quotation": true, "madera_role": true, "shop": true, "madera_status": true, "madera_stock": true, "madera_supplier": true, "madera_users": true}}';
        logger.info("addToJson: '" + addToJson + "'");

        Object.assign(this.idJsonObject, JSON.parse(addToJson))

        fs.writeFileSync(this.idFullName, JSON.stringify(this.idJsonObject));
      }
    } else {
      this.idNumber = "None";
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

  getId(){
    return this.idNumber;
  }
}

module.exports = Id
