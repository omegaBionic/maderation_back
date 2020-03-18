let querystring = require('querystring');
let url = require('url');
let fs = require('fs')
let AWS = require('aws-sdk');
let json = require('../utils/json')
let Logger = require('../utils/logger')
let logger = new Logger("getFile", "debug")

/* bucket name */
let bucket = "maderationpictures";

module.exports = {
  /**
  * getFile module.
  * @module post/getFile
  * @param {object} db - db from dynamodb format.
  * @param {object} url - url from request.
  * @param {object} req - request full.
  * @param {object} res - result from request.
  * @param {object} id - requester's id.
  * @return {json} return sended value and status.
  */
  getFile: function (url, req, res) {
    /* The title of the book. */
    logger.debug("request received into getFile function");

    /* parse datas */
    logger.debug("parse datas");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check key and check datas */
    if ('key' in params) {
      if (params['key'] == "995bwa38536b6100d3948ea0bd902c88") { // check key
        if (typeof params['filename'] != 'undefined') { // check if filename is set

            /* get file */
            var s3 = new AWS.S3()
            var paramsFile = {
                Bucket: bucket,
                Key: params['filename']
            };
            s3.getObject(paramsFile, function(err, data) {
                if (err){
                    console.log(err, err.stack); // an error occurred
                    logger.info("Error: an error occurred, bad file name");
                    res.setHeader('Content-Type', 'application/json');
                    res.status(500).send({
                      status: 500,
                      datas: 'Error: an error occurred, bad file name'
                    });
                } else {
                    console.log(data); // successful response

                    logger.info("filename found");
                    
                    /* generate file */
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
            logger.info("bad filename");
            res.setHeader('Content-Type', 'application/json');
            res.status(500).send({
              status: 500,
              datas: 'Error: bad filename'
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
