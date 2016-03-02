require('./connectionHelper');
var expect = require('chai').expect;
var supertest = require('supertest');
var app = require('../app.js');
var Order = require('../models/order');
var agent = supertest(app);

describe('order', function () {

  var order = {};

  beforeEach(function(done) {
    Order.collection.remove();
    var orders = [
      { customerName: 'Vincent Vega',   customerPhoneNumber: '+17654532001',  status : 'Ready', notificationStatus : 'None' },
      { customerName: 'Mia Wallace',   customerPhoneNumber: '+17654532002' , status : 'Ready', notificationStatus : 'None'  },
    ];
    Order.collection.insert(orders);
    Order.findOne().then(function(ord){ order = ord;done();});
  });

  describe('GET /order', function () {
    it('list all orders', function (done) {
      agent
        .get('/orders')
        .expect(function (response) {
          expect(response.text).to.contain('Vincent Vega');
          expect(response.text).to.contain('Mia Wallace');
        })
        .expect(200, done);
    });
  });

  describe('GET to /orders/:id/show', function () {
    it('shows an order detail', function (done) {
      agent
        .get(`/orders/${order.id}/show`)
        .expect(function (response) {
          expect(response.text).to.contain(order.customerName);
          expect(response.text).to.contain(order.status);
          expect(response.text).to.contain(order.notificationStatus);
        })
        .expect(200, done);
    });
  });

  describe('POST /orders/:id/pickup', function () {
    it('changes the status of an order to Shipped', function (done) {
      agent
        .post(`/orders/${order.id}/pickup`)
        .expect(function(response) {
          Order.findOne({_id: order.id})
            .then(function (order) {
              expect(order.status).to.contain('Shipped');
            });
        })
        .expect(302, done);
    });
  });

  describe('POST /orders/:id/deliver', function () {
    it('changes the status of an order to Delivered', function (done) {
      agent
        .post(`/orders/${order.id}/deliver`)
        .expect(function(response) {
          Order.findOne({_id: order.id})
            .then(function (order) {
              expect(order.status).to.contain('Delivered');
            });
        })
        .expect(302, done);
    });
  });

  describe('POST /orders/:id/status/update', function () {
    it('changes the notification status of an order to Sent(capitalized)', function (done) {
      agent
        .post(`/orders/${order.id}/status/update`)
        .type('form')
        .send({
          MessageStatus: 'sent',
        })
        .expect(function(response) {
          Order.findOne({_id: order.id})
            .then(function (order) {
              expect(order.notificationStatus).to.contain('Sent');
            });
        })
        .expect(200, done);
    });
  });
});
