let querystring = require('querystring');
let url = require('url');
let Logger = require('../utils/logger')
let logger = new Logger("invoiceQuotation", "debug")

module.exports = {
  /* this function is used for get invoiceQuotation */
  getInvoiceQuotation : function (db, url, req, res){
    logger.debug("request received into getinvoiceQuotation function.");

    /* parse datas */
    logger.debug("parse datas.");
    let params = querystring.parse(url.parse(req.url).query);
    logger.debug("key: " + params['key']);

    /* check invoiceQuotation and password */
    if ('key' in params) {
      if (params['key'] == "74cc360b19fc2a94ea620ef5803a381b"){
        let paramsdb = {
          TableName: "madera_invoice_quotation"
        };
        /* launch request for invoiceQuotation and password */
        db.scan(paramsdb, function(err, data) {
          if (err){
            console.log(err, err.stack);
            res.json(data);
          } else {
            logger.info("datas received from database");
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send({
              status: 200,
              datas: data
            });
            logger.debug("datas return ok for true status");
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
