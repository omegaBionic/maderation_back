let querystring = require('querystring');
let url = require('url');
let fs = require('fs')
let json = require('../utils/json')
let Logger = require('../utils/logger')
let logger = new Logger("postPicture", "debug")

/* bucket name */
let bucket = "maderationpictures";

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
  postPicture: function (url, req, res) {
    /* The title of the book. */
    logger.debug("request received into postPicture function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check key and check datas */
    if ('key' in params) {
      if (params['key'] == "c038zoo1a9b638f8e89d897119a1b7bb") {

        /* get and parse body to jsonBody, wait all paquets */
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString(); // convert Buffer to string
        });

        /* data treatment */
        req.on('end', chunk => {
          console.log(`body: '`, body, "'")

          if (json.isJson(body)) { // check data integrity
            logger.debug("inputJson is in json format");

            // body to json object
            let jsonBody = JSON.parse(body)

            // Load the AWS SDK for Node.js
            var AWS = require('aws-sdk');
            // Set the region 
            AWS.config.update({region: 'eu-west-1'});
            
            /* transform picture for push */
            let base64Image = jsonBody.data.split(';base64,').pop();
            var img = Buffer.from(base64Image, 'base64');

            var s3 = new AWS.S3()
            s3.putObject({
              Bucket: bucket,
              Body: img,
              Key: jsonBody.pictureName
            })
              .promise()
              .then(response => {
                logger.info("done: '" + response + "'")
                console.log(
                  `The URL is ${s3.getSignedUrl('getObject', { Bucket: bucket, Key: jsonBody.pictureName })}`
                )
                logger.info("picture sent.");
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send({
                  status: 200,
                  datas: 'Ok: picture sent'
                });
              })
              .catch(err => {
                logger.error("err for send picture.");
                res.setHeader('Content-Type', 'application/json');
                res.status(500).send({
                  status: 500,
                  datas: 'Error: err for send picture'
                });
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
