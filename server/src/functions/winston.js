'use strict'

var winston = require('winston')
var config = require('../../config')

var info = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new (require('winston-daily-rotate-file'))({
      filename: config.log.infoLogFile,
      prepend: true
    }),
    new winston.transports.File({
      filename: config.log.infoLogFile,
      level: 'info',
      name: 'info-file'
    })
  ]
})

var warn = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new (require('winston-daily-rotate-file'))({
      filename: config.log.warnLogFile,
      prepend: true
    }),
    new winston.transports.File({
      filename: config.log.warnLogFile,
      level: 'warn',
      name: 'warn-file'
    })
  ]
})

var error = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new (require('winston-daily-rotate-file'))({
      filename: config.log.errorLogFile,
      prepend: true
    }),
    new winston.transports.File({
      filename: config.log.errorLogFile,
      level: 'error',
      name: 'error-file'
    })
  ]
})

var debug = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new (require('winston-daily-rotate-file'))({
      filename: config.log.debugLogFile,
      prepend: true
    }),
    new winston.transports.File({
      filename: config.log.debugLogFile,
      level: 'debug',
      name: 'debug-file'
    })
  ]
})

module.exports = {
  info: info,
  warn: warn,
  error: error,
  debug: debug
}
