require('dotenv-safe').load();
var cfg = {};
var defaultMongoUrl = 'mongodb://localhost/eta-notifications-node';
var defaultMongoUrlTest = 'mongodb://localhost/eta-notifications-node-test';

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET || 'keyboard cat';

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

// A Twilio number you control - choose one from:
// Specify in E.164 format, e.g. "+16519998877"
cfg.twilioPhoneNumber = process.env.TWILIO_NUMBER;

// MongoDB connection string - MONGO_URL is for local dev,
cfg.mongoUrl = process.env.MONGO_URL || defaultMongoUrl;
cfg.mongoUrlTest = process.env.MONGO_URL_TEST || defaultMongoUrlTest;

// Export configuration object
module.exports = cfg;
