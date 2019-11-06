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
    this.idJsonObject;

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
    this.idNumber = params["id"];
    logger.info("input data id: " + this.idNumber);
    
    /* check if id exist */
    if (this.idNumber in this.idJsonObject){
      logger.debug("idNumber is in json file: OK");
    } else {
      logger.debug("idNumber is in json file: KO");
      //this.idJsonObject.push('"this.idNumber":{"madera_chat":true}');

      let addToJson = '{"' + this.idNumber + '":{"madera_chat":true}}';
      logger.info("addToJson: '" + addToJson + "'");

      Object.assign(this.idJsonObject, JSON.parse(addToJson))

      fs.writeFileSync(this.idFullName, JSON.stringify(this.idJsonObject));
    }
  }
}

module.exports = Id