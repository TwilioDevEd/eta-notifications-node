# ETA Notifications Node. Powered by Twilio - Node.js/Express

[![Build
Status](https://travis-ci.org/TwilioDevEd/eta-notifications-node.svg?branch=master)](https://travis-ci.org/TwilioDevEd/eta-notifications-node)


ETA notifications implementation with Node.js/Express and Twilio.

## Run the application

1. Install MongoDB

   This application stores data on a [MongoDB](https://www.mongodb.org/) database using [Mongoose](http://mongoosejs.com/). You can download and run MongoDB yourself (OS X, Linux, Windows).

   On OS X, the easiest way to get MongoDB running locally is to install it via [Homebrew](http://brew.sh/).

   ```bash
   $ brew install mongodb
   ```

   You should then be able to run a local server with:

   ```bash
   $ mongod
   ```

1. Clone the repository and `cd` into it.

   ```bash
   $ git clone git@github.com:TwilioDevEd/eta-notifications-node.git

   $ cd eta-notifications-node
   ```

1. Install the application dependencies

    ```bash
    $ npm install
    ```

1. Copy the sample configuration file and edit it to match your configuration.Remember to set your MongoDB connection strings for both environments.

  ```bash
  $ cp .env.example .env
  ```

  You can find your `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` in your
  [Twilio Account Settings](https://www.twilio.com/user/account/settings).

1. Seed the initial data into the database

   ```bash
   $ mongo localhost/eta-notifications-node seed/orders.js
   ```

1. Start the development server

    ```bash
    $ npm start
    ```

1. Expose the application to the wider Internet. [We recommend using ngrok to solve this problem](https://www.twilio.com/blog/2015/09/6-awesome-reasons-to-use-ngrok-when-testing-webhooks.html)

    ```bash
    $ ngrok http 3000
    ```

That's it!

## Run the tests

1. Run tests

    ```bash
    $ mocha test
    ```

## Meta

* No warranty expressed or implied. Software is as is. Diggity.
* [MIT License](http://www.opensource.org/licenses/mit-license.html)
* Lovingly crafted by Twilio Developer Education.
