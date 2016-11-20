'use strict'

const Lucid = use('Lucid')

class Favourite extends Lucid {
    contact() {
        return this.belongsTo('App/Model/Contact');
    }
}

module.exports = Favourite
