/**
 * Example router
 * @author Simon Tannai <tannai.simon@gmail.com>
 * @license MIT
 * @todo: Nothing
 */

'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()

const exampleController = require(path.join(__dirname, 'exampleController.js'))
const logger = require(path.join(__dirname, '..', '..', 'core', 'Logger.js'))

/**
 * Example route
 * URI: POST /
 */
router.post('/', (req, res) => {
  if (!req.body.query) {
    logger.error('No query')

    return res.status(403).send()
  } else {
    let someVar = exampleController.someFunction()

    res.status(200).send(someVar)
  }
})

/**
 * Export router
 * @type {Object}
 */
module.exports = router
