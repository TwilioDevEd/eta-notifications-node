var express = require('express');
var router = express.Router();
var Order = require('../models/order');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Order.find()
    .then(function (orders) {
      res.render('orders/index', { orders });
    });
});


router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Order.findOne({_id: id })
    .then(function (order) {
      res.render('orders/show', { order });
    });
});

module.exports = router;
