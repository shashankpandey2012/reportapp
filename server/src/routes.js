'use strict'

// var _ = require('lodash')
var app = (module.exports = require('express')())
var flagerr = false
var functions = require('./functions')
var exceptions = functions.exception
var utils = functions.utils
// var mongo = functions.mongo
var routeErrorMessage = 'sorry our chefs are busy cooking some desert!'

// load routes after categories have been cached
require('./initialize/index').load(function (err) {
  if (err) {
    flagerr = true
  }

  // request specific logging middleware
  app.use(function (req, res, next) {
    req.log = {}
    req.log.id = utils.generateUUID()
    req.log.ip = req.ip
    req.log.baseUrl = req.baseUrl
    req.log.originalUrl = req.originalUrl
    req.log.domain = req.domain
    req.log.url = req.url
    req.log.method = req.method
    req.log.reqStart = Date.now()
    req.displayError = 'FOR STARTERS';
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next()
  })

  /**
   * Now that all the necessary middlewares are in place,
   * mount various apps
   */
  // eslint-disable-next-line no-path-concat
  require(__dirname + '/routes/').forEach(function (a) {
    app.use(a.prefix, a.app)
  })

  if (!flagerr) {
    console.log('routes mounted')
  } else {
    app.use(function (req, res) {
      exceptions.customException(req, res, routeErrorMessage, 500)
    })
    console.log('mar gaye re!!!')
  }
})
