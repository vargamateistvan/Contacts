'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  contacts() {
    return this.hasMany('App/Model/Contact.js')
  }
}

module.exports = User
