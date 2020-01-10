let querystring = require('querystring');
let url = require('url');
let fs = require('fs')
let AWS = require('aws-sdk');
let json = require('../utils/json')
let Logger = require('../utils/logger')
let logger = new Logger("getPicture", "debug")

/* bucket name */
let bucket = "maderationpictures";

module.exports = {
  /**
  * getPicture module.
  * @module post/getPicture
  * @param {object} db - db from dynamodb format.
  * @param {object} url - url from request.
  * @param {object} req - request full.
  * @param {object} res - result from request.
  * @param {object} id - requester's id.
  * @return {json} return sended value and status.
  */
  getPicture: function (url, req, res) {
    /* The title of the book. */
    logger.debug("request received into getPicture function");

    /* parse datas */
    logger.debug("parse datas");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check key and check datas */
    if ('key' in params) {
      if (params['key'] == "995bwa38536b6100d3948ea0bd902c88") { // check key
        if (typeof params['picturename'] != 'undefined') { // check if picturename is set

            /* get picture */
            var s3 = new AWS.S3()
            var paramsPicture = {
                Bucket: bucket,
                Key: params['picturename']
            };
            s3.getObject(paramsPicture, function(err, data) {
                if (err){
                    console.log(err, err.stack); // an error occurred
                    logger.info("Error: an error occurred, bad picture name");
                    res.setHeader('Content-Type', 'application/json');
                    res.status(500).send({
                      status: 500,
                      datas: 'Error: an error occurred, bad picture name'
                    });
                } else {
                    console.log(data); // successful response

                    logger.info("picturename found");
                    
                    /* generate picture */
                    file = new Buffer(data.Body, 'binary');
                    attachment = file.toString('base64');

                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send({
                    status: 200,
                    data: attachment
                    });
                }
            });
        } else {
            logger.info("bad picturename");
            res.setHeader('Content-Type', 'application/json');
            res.status(500).send({
              status: 500,
              datas: 'Error: bad picturename'
            });
        }
      } else { // if bad key
        logger.info("bad bad_key");
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send({
          status: 500,
          datas: 'Error: bad key'
        });
      }
    } else { // if bad parameter
      logger.info("bad bad_parameter");
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({
        status: 500,
        datas: 'Error: bad parameter'
      });
    }
    return res;
  }
}
