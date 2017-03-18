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

    testMarvelAPI()
  }
 
  testMarvelAPI() {
    const pubKey = '0b8032d945f74b3a9f9cfc8a059e5de1'
    const privkey = '948dea1413d8e57173eae8b30011c130a1fb6fc0'
    const hash = md5(ts+privateKey+publicKey)
  }

}
