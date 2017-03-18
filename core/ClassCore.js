/**
 * NodeCore class
 * @author: Simon Tannai <tannai.simon@gmail.com>
 * @license: MIT
 * @todo: Nothing
 */

'use strict'

module.exports = class ClassCore {
  constructor () {
    /**
     * Path module from Node.js core
     * @type {Object}
     */
    this._path = require('path')

    /**
     * Logger object
     * @type {Object}
     */
    this._logger = require(this.path.join(__dirname, '/Logger.js'))
  }

  /**
   * Path getter
   * @return {Object}  Path object
   */
  get path () {
    return this._path
  }

  /**
   * Logger getter
   * @return {Object}  Logger object
   */
  get logger () {
    return this._logger
  }
}
