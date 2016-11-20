'use strict'

const Schema = use('Schema')

class FavouritesTableSchema extends Schema {

  up () {
    this.create('favourites', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.timestamps()
    })
  }

  down () {
    this.drop('favourites')
  }

}

module.exports = FavouritesTableSchema
