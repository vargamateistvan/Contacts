'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Contact = use('App/Model/Contact')
const Favourite = use('App/Model/Favourite')
const User = use('App/Model/User')
const Validator = use('Validator')

class ContactController {
    *index(request, response) {
        const categories = yield Category.all()

        for (let category of categories) {
            const contacts = yield category.contacts().limit(3).fetch();
            category.topContacts = contacts.toJSON();
        }

        yield response.sendView('main', {
            categories: categories.toJSON()
        })
    }

    *create(request, response) {
        const categories = yield Category.all()
        yield response.sendView('contactCreate', {
            categories: categories.toJSON()
        });
    }

    *doCreate(request, response) {
        const contactData = request.except('_csrf');

        const rules = {
            name: 'required',
            email: 'required',
            phone: 'required',
            area: 'required',
            avaiable: 'required',
            category_id: 'required'
        };

        const validation = yield Validator.validateAll(contactData, rules)

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back')
            return
        }

        contactData.user_id = request.currentUser.id
        const contact = yield Contact.create(contactData)
        response.redirect('/')
    }

    *edit(request, response) {
        const categories = yield Category.all()
        const id = request.param('id');
        const contact = yield Contact.find(id);

        if (request.currentUser.id !== contact.user_id) {
            response.unauthorized('Access denied.')
            return
        }

        yield response.sendView('contactEdit', {
            categories: categories.toJSON(),
            contact: contact.toJSON()
        });
    }

    *doEdit(request, response) {
        const contactData = request.except('_csrf');

        const rules = {
            name: 'required',
            email: 'required',
            phone: 'required',
            area: 'required',
            avaiable: 'required',
            category_id: 'required'
        };

        const validation = yield Validator.validateAll(contactData, rules)

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back')
            return
        }

        const id = request.param('id');
        const contact = yield Contact.find(id);

        contact.name = contactData.name;
        contact.email = contactData.email;
        contact.phone = contactData.phone;
        contact.area = contactData.area;
        contact.avaiable = contactData.avaiable;
        contact.category_id = contactData.category_id;

        yield contact.save()

        response.redirect('/')
    }

    *doDelete(request, response) {
        const id = request.param('id');
        const contact = yield Contact.find(id);

        if (request.currentUser.id !== contact.user_id) {
            response.unauthorized('Access denied.')
            return
        }

        yield contact.delete()
        response.redirect('/')
    }

    *search(request, response) {
        const page = Math.max(1, request.input('p'))
        const filters = {
            contactName: request.input('contactName') || '',
            category: request.input('category') || 0,
            createdBy: request.input('createdBy') || 0
        }

        const contacts = yield Contact.query()
            .where(function () {
                if (filters.category > 0) this.where('category_id', filters.category)
                if (filters.createdBy > 0) this.where('user_id', filters.createdBy)
                if (filters.contactName.length > 0) this.where('name', 'LIKE', `%${filters.contactName}%`)
            })
            .with('user')
            .paginate(page, 9)

        const categories = yield Category.all()
        const users = yield User.all()

        yield response.sendView('contactSearch', {
            contacts: contacts.toJSON(),
            categories: categories.toJSON(),
            users: users.toJSON(),
            filters
        })
    }

    *comment(request, response) {
        const comment = request.except('_csrf'); 
        const contact = yield Contact.find('id');
        
        //comment.contact_id = '2';
        comment.contact_id = contact.user_id;
        comment.user_id = request.currentUser.id;
        comment.comment = request.comment;
        const com = yield Comment.create(comment);

        yield com.save(comment)
        response.redirect('back')
    }

    *addFavourites(request, response) {
        const favourite = request.except('_csrf'); 
        const contact = yield Contact.find('id');
        
        //favourite.contact_id = '1';

        favourite.contact_id = contact.user_id;
        favourite.user_id = request.currentUser.id;
        const fav = yield Favourite.create(favourite);

        yield fav.save(favourite)
        response.redirect('back')
    }

    *deleteFavourites(request, response) {
        const favourites = yield Favourite.all();
        const id = request.param('id');
        const favourite = yield Favourite.find(id);

        yield favourite.delete()
        response.redirect('back')
    }

     *show(request, response) {
        const id = request.param('id');
        const contact = yield Contact.find(id);
        yield contact.related('category').load();

        yield response.sendView('contactShow', {
            contact: contact.toJSON()
        })
    }

}

module.exports = ContactController
