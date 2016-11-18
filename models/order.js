var mongoose = require('mongoose');
var config = require('../config');
var twilio = require('twilio');


var OrderSchema = new mongoose.Schema({
  customerName: String,
  customerPhoneNumber: String,
  status: {type: String, default: 'Ready'},
  notificationStatus: {type: String, default: 'None'},
});

OrderSchema.methods.sendSmsNotification = function(message, statusCallback, callback) {

  var client = twilio(config.accountSid, config.authToken);
  var self = this;
  var options = {
    to: self.customerPhoneNumber,
    from: config.twilioPhoneNumber,
    body: message,
    statusCallback: statusCallback,
  };

  client.messages.create(options)
    .then((message) => console.log('Message sent to ' + message.customerPhoneNumber))
    .catch((error) => console.log(error));

  if (callback) {
    callback.call(self);
  }
};


var Order = mongoose.model('order', OrderSchema);
module.exports = Order;
