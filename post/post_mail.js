let querystring = require('querystring');
let url = require('url');
let json = require('../utils/json')
let Logger = require('../utils/logger')
let logger = new Logger("postMail", "debug")

module.exports = {
  /**
  * postMail module.
  * @module post/postMail
  * @param {object} db - db from dynamodb format.
  * @param {object} url - url from request.
  * @param {object} req - request full.
  * @param {object} res - result from request.
  * @param {object} id - requester's id.
  * @return {json} return sended value and status.
  */
  postMail: function (url, req, res, id) {
    /* The title of the book. */
    logger.debug("request received into postMail function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check key and check datas */
    if ('key' in params) {
      if (params['key'] == "bdd5c890be92b02115330360cd77c194") {
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

            // Create sendEmail params 
            var paramsMail = {
              Destination: { /* required */
                CcAddresses: [
                  jsonBody.CcAddresses,
                  /* more items */
                ],
                ToAddresses: [
                  jsonBody.ToAddresses,
                  /* more items */
                ]
              },
              Message: { /* required */
              Body: { /* required */
                Html: {
                Charset: "UTF-8",
                Data: jsonBody.Body1
                },
                Text: {
                Charset: "UTF-8",
                Data: jsonBody.Body2
                }
              },
              Subject: {
                Charset: 'UTF-8',
                Data: jsonBody.Subject
              }
              },
            Source: 'admin@maderation.net', /* required */
            ReplyToAddresses: [
              'admin@maderation.net',
            ],
          };
          logger.debug("paramsMail: '" + JSON.stringify(paramsMail) + "'");
          
          // Create the promise and SES service object
          var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(paramsMail).promise();

          // Handle promise's fulfilled/rejected states
          sendPromise.then(
            function(data) {
              console.log(data.MessageId);
            }).catch(
              function(err) {
              console.error(err, err.stack);
            });

            logger.info("email sent.");
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send({
              status: 200,
              datas: 'Ok: email sent'
            });
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
