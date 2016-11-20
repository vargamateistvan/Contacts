'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    contacts() {
        return this.hasMany('App/Model/Contact');
    }
}

module.exports = Category
