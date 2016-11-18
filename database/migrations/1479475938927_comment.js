'use strict'

const Schema = use('Schema')

class CommentTableSchema extends Schema {

  up () {
    this.create('comment', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('contact_id').unsigned().references('id').inTable('contacts')
      table.text('comment').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('comment')
  }

}

module.exports = CommentTableSchema
