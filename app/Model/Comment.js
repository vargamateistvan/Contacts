'use strict'

const Lucid = use('Lucid')

class Comment extends Lucid {
    contact() {
        return this.belongsTo('App/Model/Contact');
    }
}

module.exports = Comment
