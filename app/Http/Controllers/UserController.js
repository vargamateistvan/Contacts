'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Category = use('App/Model/Category')
const Favourite = use('App/Model/Favourite')
const Hash = use('Hash')

class UserController {
    *register(request, response) {
        const isLoggedIn = yield request.auth.check()
        if (isLoggedIn) {
            response.redirect('/')
        }

        yield response.sendView('register')
    }

    *doRegister(request, response) {
        const registerData = request.except('_csrf');

        const rules = {
            username: 'required|alpha_numeric|unique:users',
            email: 'required|email|unique:users',
            password: 'required|min:4',
            password_confirm: 'required|same:password',
        };

        const validation = yield Validator.validateAll(registerData, rules)

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            response.redirect('back')
            return
        }

        const user = new User()

        user.username = registerData.username;
        user.email = registerData.email;
        user.password = yield Hash.make(registerData.password)
        yield user.save()

        yield request.auth.login(user)

        response.redirect('/')
    }

    *login(request, response) {
        const isLoggedIn = yield request.auth.check()
        if (isLoggedIn) {
            response.redirect('/')
        }

        yield response.sendView('login')
    }

    *doLogin(request, response) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            const login = yield request.auth.attempt(email, password)

            if (login) {
                response.redirect('/')
                return
            }
        }
        catch (err) {
            yield request
                .withAll()
                .andWith({
                    errors: [
                        {
                            message: 'Invalid credentails'
                        }
                    ]
                })
                .flash()

            response.redirect('/login')
        }
    }

    *doLogout(request, response) {
        yield request.auth.logout()
        response.redirect('/')
    }

    *show(request, response) {
        //Categories
        const categories = yield Category.all()

        for (let category of categories) {
            const contacts = yield category.contacts().fetch();
            category.topContacts = contacts.toJSON();
        }

        //Favourite
        const favourites = yield Favourite.all()

        for (let fav of categories) {
            const contacts = yield fav.contacts().fetch();
            fav.topFav = contacts.toJSON();
        }

        yield response.sendView('userShow', {
            categories: categories.toJSON(),
            favourites: favourites.toJSON()
        })
    }

    *ajaxLogin(request, response) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            const login = yield request.auth.attempt(email, password) 
            if (login) {
                response.send({ success: true })
                return
            }
        } 
        catch (err) {
            response.send({ success: false })
        }
    }
}

module.exports = UserController
