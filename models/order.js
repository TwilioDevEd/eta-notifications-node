const mongoose = require('mongoose');
const config = require('../config');
const twilio = require('twilio');


const OrderSchema = new mongoose.Schema({
  customerName: String,
  customerPhoneNumber: String,
  status: {type: String, default: 'Ready'},
  notificationStatus: {type: String, default: 'None'},
});

OrderSchema.methods.sendSmsNotification = function(message, statusCallback) {
  if (!statusCallback) {
    throw new Error('status callback is required to send notification.');
  }

  const client = twilio(config.twilioAccountSid, config.twilioAuthToken);
  const options = {
    to: this.customerPhoneNumber,
    from: config.twilioPhoneNumber,
    body: message,
    statusCallback: statusCallback,
  };

  return client.messages.create(options)
    .then((message) => {
      console.log('Message sent to ' + message.to);
    });
};


const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
