'use strict'

const Lucid = use('Lucid')

class Contact extends Lucid {
    category() {
        return this.belongsTo('App/Model/Category');
    }

    user() {
        return this.belongsTo('App/Model/User');
    }

    comment() {
        return this.hasMany('App/Model/Comment');
    }
}

module.exports = Contact
