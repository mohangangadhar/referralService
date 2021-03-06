const getRoutes = require('./product-get-route');
const postRoutes = require('./product-post-route');
const putRoutes = require('./product-put-route');
const deleteRoutes = require('./product-delete-route');
const loadDatabase = require('../data/setup-database');
const loadOrders = require('./order-get-route');
const refferalData = require('./refferal-amount-route');

module.exports = function (app, db) {

  // create database in case it was not created yeat, 
  // or update in case of migrations
  loadDatabase(db);

  // start routes
  getRoutes(app, db);
  postRoutes(app, db);
  putRoutes(app, db);
  deleteRoutes(app, db);
  loadOrders(app, db);
  refferalData(app,db);
};
