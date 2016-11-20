'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Comment = use('App/Model/Comment')
const User = use('App/Model/User')
const Validator = use('Validator')

class CommentController {
    *doCreate(request, response) {
        const commentData = request.except('_csrf');

        const rules = {
            comment: 'required'
        };

        const validation = yield Validator.validateAll(commentData, rules)

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back')
            return
        }

        commentData.user_id = request.currentUser.id
        const comment = yield Comment.create(commentData)
        response.redirect('/contact/:id')
    }
}

module.exports = CommentController
