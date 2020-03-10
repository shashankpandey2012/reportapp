var app = (module.exports = require('express')())
// var _ = require('lodash')

// var functions = require('functions');
app.use('/reports', require('./reports'))
