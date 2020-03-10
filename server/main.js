const express = require('express')
const app = express()
const config = require('./config')
const path = require('path')
const port = config.app.port
const env = process.env.NODE_ENV
var functions = require('./src/functions')

app.use((req, res, next) => {
  console.log('ENV ', env)
  // console.log(functions)
  // res.send('Hello World')
  next()
})

var bodyParser = require('body-parser')

// use compression
// app.use(compression());
// app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json({ limit: '250mb' }))
// app.use(bodyParser.raw({limit: '100mb', type: '*/*'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '250mb', extended: true }))

app.use(require('./src/routes.js'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
