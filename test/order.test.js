require('./connectionHelper');
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app.js');
const Order = require('../models/order');
const agent = supertest.agent(app);
const nock = require('nock');

function createMessageRequest() {
  return nock('https://api.twilio.com')
    .post(/\/2010-04-01\/Accounts\/.*\/Messages\.json$/)
    .reply(201, {
       "sid":"SM740b67bc129343e284e7fbb703f9ebbb",
       "date_created":"Wed, 23 Nov 2016 20:10:55 +0000",
       "date_updated":"Wed, 23 Nov 2016 20:10:55 +0000",
       "date_sent":null,
       "account_sid":"ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
       "to":"+17654532001",
       "from":"+17072053552",
       "messaging_service_sid":null,
       "body":"Your clothes will be sent and will be delivered in 20 minutes",
       "status":"queued",
       "num_segments":"1",
       "num_media":"0",
       "direction":"outbound-api",
       "api_version":"2010-04-01",
       "price":null,
       "price_unit":"USD",
       "error_code":null,
       "error_message":null,
       "uri":"/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SM740b67bc129343e284e7fbb703f9ebbb.json",
       "subresource_uris":{
          "media":"/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SM740b67bc129343e284e7fbb703f9ebbb/Media.json"
       }
    });
}

describe('order', function() {
  let order = {};
  const orders = [
    {customerName: 'Vincent Vega', customerPhoneNumber: '+17654532001',
     status: 'Ready', notificationStatus: 'None'},
    {customerName: 'Mia Wallace', customerPhoneNumber: '+17654532002',
     status: 'Ready', notificationStatus: 'None'},
  ];

  beforeEach(function(done) {
    createMessageRequest();

    Order.deleteMany().then(function() {
      return Order.collection.insertMany(orders);
    }).then(function() {
      return Order.findOne();
    }).then(function(ord) {
      order = ord;
      done();
    });
  });

  describe('GET /order', function() {
    it('list all orders', function(done) {
      agent
        .get('/orders')
        .expect(200)
        .expect(function(response) {
          expect(response.text).to.contain('Vincent Vega');
          expect(response.text).to.contain('Mia Wallace');
        })
        .end(done);
    });
  });

  describe('GET to /orders/:id/show', function() {
    it('shows an order detail', function() {
      return agent
        .get(`/orders/${order._id}/show`)
        .expect(200)
        .expect(function(response) {
          expect(response.text).to.contain(order.customerName);
          expect(response.text).to.contain(order.status);
          expect(response.text).to.contain(order.notificationStatus);
        });
    });
  });

  describe('POST /orders/:id/pickup', function() {
    it('changes the status of an order to Shipped', function() {
      return agent
        .post(`/orders/${order._id}/pickup`)
        .expect(302)
        .then(function() {
          return Order.findOne({_id: order._id});
        })
        .then(function(order) {
          return expect(order.status).to.contain('Shipped');
        });
    });
  });

  describe('POST /orders/:id/deliver', function() {
    it('changes the status of an order to Delivered', function() {
      return agent
        .post(`/orders/${order._id}/deliver`)
        .expect(302)
        .then(function() {
          return Order.findOne({_id: order._id});
        })
        .then(function(order) {
          return expect(order.status).to.contain('Delivered');
        });
    });
  });

  describe('POST /orders/:id/status/update', function() {
    it('changes the notification status of an order to Sent(capitalized)', function() {
      return agent
        .post(`/orders/${order._id}/status/update`)
        .type('form')
        .send({
          MessageStatus: 'sent',
        })
        .expect(200)
        .then(function() {
          return Order.findOne({_id: order._id});
        })
        .then(function(order) {
          return expect(order.notificationStatus).to.contain('Sent');
        });
    });
  });
});
