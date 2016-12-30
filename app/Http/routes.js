'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'ContactController.index')
//CREATE
Route.get('/contacts/create', 'ContactController.create').middleware('auth')
Route.post('/contacts/create', 'ContactController.doCreate').middleware('auth')
//EDIT
Route.get('/contacts/:id/edit', 'ContactController.edit').middleware('auth')
Route.post('/contacts/:id/edit', 'ContactController.doEdit').middleware('auth')
//DELETE
Route.get('/contacts/:id/delete', 'ContactController.doDelete').middleware('auth')
//SEARCH
Route.get('/contacts', 'ContactController.search')
//ADD Favourties
Route.get('/contacts/:id/favourite', 'ContactController.addFavourites').middleware('auth')
//COMMENT
Route.post('/contacts/:id/comment', 'ContactController.comment').middleware('auth')

//SHOW
Route.get('/contacts/:id', 'ContactController.show')

//DELETE Favourties
Route.get('/users/:id/delete', 'ContactController.deleteFavourites').middleware('auth')
//FAVOURITES
Route.get('/users/:id', 'UserController.show').middleware('auth')

//REGISTER
Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
//LOGIN
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
//LOGOUT
Route.get('/logout', 'UserController.doLogout')

Route.group('ajax', function () {
    Route.delete('/recipes/:id/delete', 'RecipeController.ajaxDelete').middleware('auth')
    Route.post('/login', 'UserController.ajaxLogin')
}).prefix('/ajax')
