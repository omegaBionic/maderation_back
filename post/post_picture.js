let querystring = require('querystring');
let url = require('url');
let fs = require('fs')
let json = require('../utils/json')
let Logger = require('../utils/logger')
let logger = new Logger("postPicture", "debug")

module.exports = {
  /**
  * postPicture module.
  * @module post/postPicture
  * @param {object} db - db from dynamodb format.
  * @param {object} url - url from request.
  * @param {object} req - request full.
  * @param {object} res - result from request.
  * @param {object} id - requester's id.
  * @return {json} return sended value and status.
  */
  postPicture: function (url, req, res, id) {
    /* The title of the book. */
    logger.debug("request received into postPicture function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    const BUCKET = "maderationpictures";
    let localImage = "./badlogic.jpg";
    let imageRemoteName = "badlogic.jpg";

    /* check key and check datas */
    if ('key' in params) {
      if (params['key'] == "c038zoo1a9b638f8e89d897119a1b7bb") {
        /* get and parse body to jsonBody */
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString(); // convert Buffer to string
          logger.debug("body: '" + body + "'")

          if (json.isJson(body)) { // check data integrity
            logger.debug("inputJson is in json format");
            /* post mail */
            let jsonBody = JSON.parse(body)
            // Load the AWS SDK for Node.js
            var AWS = require('aws-sdk');
            // Set the region 
            AWS.config.update({region: 'eu-west-1'});
            
            var s3 = new AWS.S3()
            
            s3.putObject({
              Bucket: BUCKET,
              Body: fs.readFileSync(localImage),
              Key: imageRemoteName
            })
              .promise()
              .then(response => {
                console.log(`done! - `, response)
                console.log(
                  `The URL is ${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: imageRemoteName })}`
                )
              })
              .catch(err => {
                console.log('failed:', err)
              })
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
