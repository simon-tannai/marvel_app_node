/**
 * Marvel router
 * @author Simon Tannai <tannai.simon@gmail.com>
 * @license MIT
 * @todo: Nothing
 */

'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()

const MarvelCtrl = require(path.join(__dirname, 'marvelCtrl.js'))
const marvelCtrl = new MarvelCtrl()

const logger = require(path.join(__dirname, '..', '..', 'core', 'Logger.js'))

/**
 * Example route
 * URI: POST /
 */
router.get('/characters/:offset/:limit', (req, res) => {
  marvelCtrl.getCharacters(parseInt(req.params.offset), parseInt(req.params.limit))
  .then(
    (characters) => {
      return res.status(200).json(characters)
    },
    (error) => {
      return res.status(400).send(error)
    }
  )
})

/**
 * Export router
 * @type {Object}
 */
module.exports = router
