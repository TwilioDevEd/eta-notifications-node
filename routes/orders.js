var express = require('express');
var router = express.Router();
var Order = require('../models/order');

// GET: /orders
router.get('/', function(req, res, next) {
  Order.find()
    .then(function (orders) {
      res.render('orders/index', { orders });
    });
});

// GET: /orders/4
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Order.findOne({_id: id })
    .then(function (order) {
      res.render('orders/show', { order });
    });
});

// POST: /orders/4/pickup
router.post('/:orderId/pickup', function(req, res, next) {

  var id = req.params.orderId;

  Order.findOne({_id: id })
    .then(function (order) {
      order.status = 'Shipped';
      order.notificationStatus = 'Queued';
      order.save();

      order.sendSmsNotification('Your clothes will be sent and will be delivered in 20 minutes', getCallbackUri(req) );
      res.redirect(`/orders/${id}`);
    });
});

// POST: /orders/4/deliver
router.post('/:orderId/deliver', function(req, res, next) {

  var id = req.params.orderId;
  var host = req.headers.host;

  Order.findOne({_id: id })
    .then(function (order) {
      order.status = 'Delivered';
      order.notificationStatus = 'Queued';
      order.save();

      order.sendSmsNotification('Your clothes have been delivered', getCallbackUri(req) );
      res.redirect(`/orders/${id}`);
    });
});

var getCallbackUri = function(req){
  var host = req.headers.host;
  return `http://${host}/status`
}

module.exports = router;
