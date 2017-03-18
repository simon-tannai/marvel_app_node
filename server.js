/**
 * Node.js for Marvel app
 * @author: Simon Nowis <tannai.simon@gmail.com>
 * @license: MIT
 * @todo: Nothing
 */

'use strict'

const path = require('path')
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const logger = require(path.join(__dirname, 'core', 'Logger.js'))
const fs = require('fs')

const app = express()
const port = 8080

// Use helmet for security
app.use(helmet())

// Use bodyParser for get POST params
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Use CORS to enable Cross Domaine requests
app.use(cors())

// Define static foler who will contains the Webapp, like Angular.js
app.use(express.static(path.join(__dirname, 'webapp')))

/* =================================================================== *\
 *  LOG HTTP
\* =================================================================== */
if (process.env.NODE_ENV === 'production') {
  const fileStreamRotator = require('file-stream-rotator')

  let logDirectory = path.join(__dirname, 'logs')

  // ensure log directory exists
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory)
  }

  // create a rotating write stream
  let accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  })

  // setup the logger
  app.use(morgan('combined', {stream: accessLogStream}))
} else {
  app.use(morgan('combined'))
}
/* =================================================================== *\
 *  END OF LOG HTTP
\* =================================================================== */

app.get('/', (req, res) => {
  res.status(200).send('May the force be with you.')
})

/* =================================================================== *\
 *  ROUTES
\* =================================================================== */
// Import example router module
const marvelRouter = require(path.join(__dirname, 'bundles', 'marvel', 'marvelRouter.js'))

// Use marvel router
// All routes in marvel router will start by '/marvel'
app.use('/marvel', marvelRouter)
/* =================================================================== *\
 *  END OF ROUTES
\* =================================================================== */

/* =================================================================== *\
 *
 *  AMAZING CODE HERE
 *
\* =================================================================== */

let srv = app.listen(port, () => {
  logger.info(`Server run on port ${port} in ${process.env.NODE_ENV} mode`)
})

// Export server. He will be used by tests unit.
module.exports = srv
