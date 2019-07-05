import config from '../config.js'

export default class Actor {
  constructor () {
    this._sprite = null
    this.height = 0
    this.width = 0
  }

  set sprite (name) {
    this.height = config.sprites[name].h /2 
    this._sprite = name
    this.width = config.sprites[name].w / 2
  }

  get sprite () {
    return this._sprite
  }

  hits (actors) {
    return actors
      .filter(Boolean)
      .some(actor => {
        if (this.x >= (actor.x + actor.width-6) || actor.x >= (this.x + this.width-6)) {
          return false
        }

        if (this.y >= (actor.y + actor.height-6) || actor.y >= (this.y + this.height-6)) {
          return false
        }

        return true
      })
  }
}
