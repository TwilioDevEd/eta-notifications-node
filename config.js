require('dotenv-safe').config();

module.exports = {
  // HTTP Port to run our web application
  port: process.env.PORT || 3000,

  // A random string that will help generate secure one-time passwords and
  // HTTP sessions
  secret: process.env.APP_SECRET || 'keyboard cat',

  // Your Twilio account SID and auth token, both found at:
  // https://www.twilio.com/user/account
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,

  // A Twilio number you control - choose one from:
  // Specify in E.164 format, e.g. "+16519998877"
  twilioPhoneNumber: process.env.TWILIO_NUMBER,

  // MongoDB connection string - MONGO_URL is for local dev,
  mongoUri: process.env.MONGO_URI,
};
