'use strict'

// const _ = require('lodash')
const functions = require('../functions')
// const config = require('../../config')
const utils = functions.utils
const logger = functions.winston
// const exception = functions.exception
// const fs = require('fs')

module.exports = {
  genericResponse: function (req, res, next) {
    if (!req.dummy) {
      utils.responseGenerator(req, null).then(function (data) {
        utils.snakeCaseToCamelCaseConversion(data).then(response => {
          logger.info.log('info', req.log)
          res.send(response)
          res.end()
        })
        logger.info.log('info', req.log)
      })
    } else {
      req.data = [
        {
          dummy: 'dummy Response Object'
        }
      ]
      utils.responseGenerator(req, null).then(function (data) {
        logger.info.log('info', req.log)
        res.send(data)
        res.end()
      })
    }
  }
}
