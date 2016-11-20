'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  contacts() {
    return this.hasMany('App/Model/Contact')
  }

  favourites() {
    return this.hasMany('App/Model/Favourite')
  }
}

module.exports = User
