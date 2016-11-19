var express = require('express');
var router = express.Router();
var Order = require('../models/order');

// GET: /orders
router.get('/', function(req, res, next) {
  Order.find().then(function(orders) {
    res.render('orders/index', {orders});
  });
});

// GET: /orders/4
router.get('/:id/show', function(req, res, next) {
  var id = req.params.id;
  Order.findOne({_id: id}).then(function(order) {
    res.render('orders/show', {order: order});
  });
});

// POST: /orders/4/pickup
router.post('/:orderId/pickup', function(req, res, next) {
  var id = req.params.orderId;

  Order.findOne({_id: id}).then(function(order) {
    order.status = 'Shipped';
    order.notificationStatus = 'Queued';
    order.save();

    order.sendSmsNotification('Your clothes will be sent and will be delivered in 20 minutes', getCallbackUri(req) );
    res.redirect(`/orders/${id}/show`);
  });
});

// POST: /orders/4/deliver
router.post('/:orderId/deliver', function(req, res, next) {
  var id = req.params.orderId;

  Order.findOne({_id: id}).then(function(order) {
    order.status = 'Delivered';
    order.notificationStatus = 'Queued';
    order.save();

    order.sendSmsNotification('Your clothes have been delivered', getCallbackUri(req) );
    res.redirect(`/orders/${id}/show`);
  });
});


// POST: /orders/4/status/update
router.post('/:orderId/status/update', function(req, res, next) {
  var id = req.params.orderId;
  var notificationStatus = req.body.MessageStatus;

  Order.findOne({_id: id}).then(function(order) {
    order.notificationStatus = notificationStatus.charAt(0).toUpperCase() + notificationStatus.slice(1);
    order.save();
    res.sendStatus(200);
  });
});

function getCallbackUri(req) {
  var host = req.headers.host;
  return `http://${host}/orders/${req.params.orderId}/status/update`;
};

module.exports = router;
