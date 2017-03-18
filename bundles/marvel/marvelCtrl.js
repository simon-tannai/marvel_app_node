/**
 * Example router
 * @author Simon Tannai <tannai.simon@gmail.com>
 * @license MIT
 * @todo: Nothing
 */

const path = require('path')
const ClassCore = require(path.join(__dirname, '..', '..', 'core', 'ClassCore.js'))

module.exports = class MarvelCtrl extends ClassCore {
  /**
   * Class constructor
   */
  constructor () {
    // Call parent's constructor
    super()

    this._config = require(this.path.join(__dirname, '..', '..', 'config', 'marvelApi.json'))
    this._crypto = require('crypto')
    this._http = require('http')
  }

  /**
   * Get characters from marvel API
   * @param {Number} offset   Row where results start. Default 0.
   * @param {Number} limit    Number of results. Default 20.
   * @return {Object}         Return JSON who contains characters
   */
  getCharacters (offset = 0, limit = 20) {
    return new Promise((resolve, reject) => {
      /**
       * Current unix timestamp
       * @type {Number}
       */
      const ts = Date.now()

      /**
       * MD5 hash
       * @type {String}
       */
      const hash = this.crypto.createHash('md5').update(ts + this.config.privateKey + this.config.publicKey).digest('hex')

      /**
       * The path of the request
       * @type {String}
       */
      let path = `/v1/public/characters?ts=${ts}&apikey=${this.config.publicKey}&hash=${hash}`

      if (offset > 0) {
        path += `&offset=${offset}`
      }

      if (limit > 0) {
        path += `&limit=${limit}`
      }

      /**
       * HTTP request's options
       * @type {Object}
       */
      const options = {
        hostname: 'gateway.marvel.com',
        port: 80,
        path: path,
        method: 'GET',
        headers: {
          'Content-Type': 'application/JSON'
        }
      }

      /**
       * Full response's chunks
       * @type {String}
       */
      let chunks = ''

      /**
       * HTTP request object
       * @type {Object}
       */
      const req = this.http.request(options, (res) => {
        res.setEncoding('utf8')

        res.on('data', (chunk) => {
          chunks += chunk
        })

        res.on('end', () => {
          // Return results when request is done
          return resolve(JSON.parse(chunks).data.results)
        })
      })

      req.on('error', (e) => {
        this.logger.error(e)
        return reject(e)
      })

      req.end()
    })
  }

  get config () {
    return this._config
  }

  get crypto () {
    return this._crypto
  }

  get http () {
    return this._http
  }
}
