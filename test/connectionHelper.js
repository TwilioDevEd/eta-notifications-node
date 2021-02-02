const mongoose = require('mongoose');
const cfg = require('../config');

exports.mongoConnection = mongoose.connect(cfg.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = Promise;
