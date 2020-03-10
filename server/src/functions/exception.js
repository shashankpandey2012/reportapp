'use strict'

var _ = require('lodash')
var logger = require('./winston')
const fs = require('fs')

module.exports = {
  customException: function (req, res, err, statusCode) {
    if (req.files) {
      Object.keys(req.files).forEach(function (file) {
        if (req.files[file].path) {
          fs.promises.unlink(req.files[file].path, function (err) {
            console.log(err)
          })
        }
      })
    }

    var errJSON = {
      status: false,
      data: [],
      error: 'Something went wrong. Please try again'
    }
    if (!_.has(err, 'message')) {
      errJSON.error = 'Something went wrong. Please try again'
    } else {
      const stopMessage = [
        'mongoose',
        'mongo',
        'timeout',
        'failed to connect',
        'user_level_idx',
        'cannot insert duplicate key row',
        'cannot read property'
      ]
      for (let i = 0; i < stopMessage.length; i++) {
        if (err.message.toLowerCase().indexOf(stopMessage[i]) >= 0) {
          err.message = 'Something went wrong. Please try again'
          req.displayError = err.message
          break
        }
      }
    }

    if (req.displayError) {
      errJSON.error = req.displayError
    }
    // request logging calculations
    req.log.reqEnd = Date.now()
    req.log.responseTime = req.log.reqEnd - req.log.reqStart
    if (!_.isObject(err)) {
      errJSON.error = err
    } else {
      err.id = req.log.id
    }
    logger.info.log('info', req.log)
    logger.error.log('error', err)
    logger.debug.log('debug', err)
    statusCode =
      _.isUndefined(statusCode) || !_.isNumber(statusCode) ? 400 : statusCode
    res.status(statusCode).send(errJSON)
    res.end()
  }
}
