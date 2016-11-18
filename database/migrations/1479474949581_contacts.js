'use strict'

const Schema = use('Schema')

class ContactsTableSchema extends Schema {

  up () {
    this.create('contacts', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('email ').notNullable()
      table.string('phone').notNullable()
      table.string('area').notNullable()
      table.string('avaiable').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('contacts')
  }

}

module.exports = ContactsTableSchema
