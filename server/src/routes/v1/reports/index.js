var app = (module.exports = require('express')())
app.use('/reports', require('./reports'))
