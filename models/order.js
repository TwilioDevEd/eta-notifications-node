var mongoose = require('mongoose');
var config = require('../config');
var twilio = require('twilio');


var OrderSchema = new mongoose.Schema({
  customerName: String,
  customerPhoneNumber: String,
  status: {type: String, default: 'Ready'},
  notificationStatus: {type: String, default: 'None'},
});

OrderSchema.methods.sendSmsNotification = function(message, statusCallback) {
  if (!statusCallback) {
    throw new Error('status callback is required to send notification.');
  }

  var client = twilio(config.twilioAccountSid, config.twilioAuthToken);
  var self = this;
  var options = {
    to: self.customerPhoneNumber,
    from: config.twilioPhoneNumber,
    body: message,
    statusCallback: statusCallback,
  };

  return client.messages.create(options)
    .then((message) => {
      console.log('Message sent to ' + message.to);
    })
};


var Order = mongoose.model('order', OrderSchema);
module.exports = Order;
