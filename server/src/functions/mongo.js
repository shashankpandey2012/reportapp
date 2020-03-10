'use strict'

var mongoose = require('mongoose')
var Promise = require('bluebird')
var config = require('../../config')
mongoose
  .connect(config.databases.mongo.mongoSessionUrl, {
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(connection => {})
  .catch(e => {
    console.log('e')
  })

module.exports = {
  mongoose: mongoose
}
