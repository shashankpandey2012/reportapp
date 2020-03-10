'use strict'

const _ = require('lodash');
const Promise = require('bluebird');
const nodeUUIDV4 = require('uuid/v4');
const exception = require('./exception');

const utils = {
  generateUUID: function () {
    return nodeUUIDV4()
  },
  snakeCaseToCamelCaseConversion: function (objectArg) {
    return new Promise((resolve, reject) => {
      function camelCase (obj) {
        var exceptionList = ['ID', 'IU', 'SSSY']
        var resultantObject, originalKey, newKey, value, newKeyList
        if (obj instanceof Array) {
          resultantObject = []
          for (originalKey in obj) {
            value = obj[originalKey]
            if (typeof value === 'object') {
              value = camelCase(value)
            }
            resultantObject.push(value)
          }
        } else {
          resultantObject = {}
          for (originalKey in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(originalKey)) {
              newKeyList = originalKey.split('_')
              for (var i = 0; i < newKeyList.length; i++) {
                if (i === 0) {
                  newKey = newKeyList[i].toString()
                } else if (
                  ~exceptionList.indexOf(newKeyList[i].toUpperCase())
                ) {
                  newKey += newKeyList[i].toUpperCase()
                } else {
                  newKey +=
                    newKeyList[i].charAt(0).toUpperCase() +
                    newKeyList[i].slice(1)
                }
              }
              value = obj[originalKey]
              if (
                value != null &&
                value !== 'undefined' &&
                (value.constructor === Object || value.constructor === Array)
              ) {
                value = camelCase(value)
              }
              resultantObject[newKey] = value
            }
          }
        }
        return resultantObject
      }

      resolve(camelCase(objectArg))
    })
  },
  responseGenerator: function (req) {
    return new Promise(function (resolve, reject) {
      const response = {}
      if (
        !_.isNull(req.data) &&
        !_.isUndefined(req.data) &&
        _.isEmpty(req.error)
      ) {
        response.status = true
        response.data = req.data
        response.error = ''

        // logging part for request
        req.log.reqEnd = Date.now()
        req.log.requestTime = req.log.reqEnd - req.log.reqStart
      } else {
        req.log.reqEnd = Date.now()
        req.log.requestTime = req.log.reqEnd - req.log.reqStart
        req.log.error = req.error
        response.status = false
        response.data = ''
        response.error = req.displayError
      }
      resolve(response)
    })
  },
  errorFunction: function (layer, error, display, req, res) {
    req.displayError = display
    exception.customException(req, res, error, 200)
  },
}
module.exports = utils
