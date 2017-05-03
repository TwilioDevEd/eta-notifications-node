var mongoose = require('mongoose');
var cfg = require('../config');

exports.mongoConnection = mongoose.connect(cfg.mongoUri);
mongoose.Promise = Promise;
