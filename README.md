# ETA Notifications Node. Powered by Twilio - Node.js/Express

[![Build
Status](https://travis-ci.org/TwilioDevEd/eta-notifications-node.svg?branch=master)](https://travis-ci.org/TwilioDevEd/eta-notifications-node)


ETA notifications implementation with Node.js/Express and Twilio.

### Run the application

1. This sample application stores data in a [MongoDB](https://www.mongodb.org/) database using [Mongoose](http://mongoosejs.com/). You can download and run MongoDB yourself (OS X, Linux, Windows).

   On OS X, maybe the easiest way to get MongoDB running locally is to install via [Homebrew](http://brew.sh/).

   ```bahs
   $ brew install mongodb
   ```

   You should then be able to run a local server with:

   ```bash
   $ mongod
   ```

1. Then you should clone this repository and `cd` into its directory:
   ```bash
   $ git clone git@github.com:TwilioDevEd/eta-notifications-node.git

   $ cd eta-notifications-node
   ```

1. Install project's dependencies:

    ```bash
    $ npm install
    ```

1. Edit the sample environments vars file `.env` to match your configuration. Remember to set your MongoDb connection strings for both environments.

   ```
   export TWILIO_ACCOUNT_SID=Your-Account-SID
   export TWILIO_AUTH_TOKEN=Your-Twilio-Auth-Token
   export TWILIO_PHONE_NUMBER=Your-Twilio-Phone-Number
   export MONGO_URL=Mongo-Url
   export MONGO_URL_TEST=Mongo-Url-Test

   ```

  You can find your `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` in your
  [Twilio Account Settings](https://www.twilio.com/user/account/settings).

1. Seed the initial data into the database by running the following:

   ```bash
   $ mongo localhost/eta-notifications-node seed/orders.js
   ```

1. Start the development server

    ```bash
    $ npm start
    ```

1. Expose the application to the wider Internet using [ngrok](https://ngrok.com/)

    ```bash
    $ ngrok http 3000
    ```

That's it

## Run the tests

1. Run tests

    ```bash
    $ mocha test
    ```

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
