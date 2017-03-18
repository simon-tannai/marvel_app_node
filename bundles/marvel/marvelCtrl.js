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

    this.testMarvelAPI()
  }

  testMarvelAPI () {
    const ts = Date.now()
    const hash = this.crypto.createHash('md5').update(ts + this.config.privateKey + this.config.publicKey).digest('hex')

    const options = {
      hostname: 'gateway.marvel.com',
      port: 80,
      path: `/v1/public/characters?ts=${ts}&apikey=${this.config.publicKey}&hash=${hash}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/JSON'
      }
    }

    let chunks

    const req = this.http.request(options, (res) => {
      res.setEncoding('utf8')

      res.on('data', (chunk) => {
        chunks += chunk
      })

      res.on('end', () => {
        console.log(chunks)
      })
    })

    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`)
    })

    req.end()
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
