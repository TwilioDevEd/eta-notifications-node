var mongoose = require('mongoose');
var cfg = require('../config');
var twilio = require('twilio');

var OrderSchema = new mongoose.Schema({
  customerName:String,
  customerPhoneNumber: String,
  status : { type: String, default: 'Ready' },
  notificationStatus : { type: String, default: 'None' },
});

var Order = mongoose.model('order', OrderSchema);
module.exports = Order;
