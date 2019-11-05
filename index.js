/* REQUIREMENTS */
let Logger = require('./utils/logger');
let status = require('./get/status');
let logger = new Logger("index", "debug");
let users = require('./get/users');
let client = require('./get/client');
let addressClient = require('./get/address_client');
let addressSupplier = require('./get/address_supplier');
let category = require('./get/category');
let chat = require('./get/chat');
let component = require('./get/component');
let gamme = require('./get/gamme');
let invoiceQuotation = require('./get/invoice_quotation');
let message = require('./get/message');
let product = require('./get/product');

/* MODULS AND SETUP */
let express = require('express');
let http = require('http');
let url = require('url');
let querystring = require('querystring');

/* start the http listening server */
let app = express();
app.listen(8080);

/* aws connection */
let AWS = require('aws-sdk');
let db = new AWS.DynamoDB({'region': 'eu-west-3'});

/* /api/get/status */
app.get('/api/get/status', function(req, res) {
  res = status.getStatus(db, url, req, res)
})

/* /api/get/user */
app.get('/api/get/user', function(req, res) {
  res = users.getUser(db, url, req, res)
})

/* /api/get/client */
app.get('/api/get/client', function(req, res) {
  res = client.getClient(db, url, req, res)
})

/* /api/get/address_client */
app.get('/api/get/address_client', function(req, res) {
  res = addressClient.getAddressClient(db, url, req, res)
})

/* /api/get/address_supplier */
app.get('/api/get/address_supplier', function(req, res) {
  res = addressSupplier.getAddressSupplier(db, url, req, res)
})

/* /api/get/category */
app.get('/api/get/category', function(req, res) {
  res = category.getCategory(db, url, req, res)
})

/* /api/get/chat */
app.get('/api/get/chat', function(req, res) {
  res = chat.getChat(db, url, req, res)
})

/* /api/get/component */
app.get('/api/get/component', function(req, res) {
  res = component.getComponent(db, url, req, res)
})

/* /api/get/gamme */
app.get('/api/get/gamme', function(req, res) {
  res = gamme.getGamme(db, url, req, res)
})

/* /api/get/invoice_quotation */
app.get('/api/get/invoice_quotation', function(req, res) {
  res = invoiceQuotation.getInvoiceQuotation(db, url, req, res)
})

/* /api/get/message */
app.get('/api/get/message', function(req, res) {
  res = message.getMessage(db, url, req, res)
})

/* /api/get/product */
app.get('/api/get/product', function(req, res) {
  res = product.getProduct(db, url, req, res)
})

/* if bad answer not found 404 */
.use(function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  res.status(404).send({
    status: 404,
    datas: 'page not found'
  });
});
