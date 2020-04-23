"use strict";
require("dotenv").config();
Promise = require("bluebird")
module.exports = {
  omdb: {
    apiKey: process.env.OMDB_API_KEY
  },
  transmission: {
    username: process.env.TRANSMISSION_USERNAME,
    password: process.env.TRANSMISSION_PASSWORD
  }
}
