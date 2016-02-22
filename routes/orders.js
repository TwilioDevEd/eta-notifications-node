var express = require('express');
var router = express.Router();
var Order = require('../models/order');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Order.find()
    .then(function (orders) {
      res.render('orders/index', { orders});
    });
});

module.exports = router;
