const express = require('express');
const mainController = require('../controllers/main');
const router = express.Router();

//rutas de libros
router.get('/', mainController.home);

router.get('/books/detail/:id', mainController.bookDetail);
router.get('/books/create', mainController.create);
router.post ("/books/create", mainController.save);

router.get('/books/edit/:id', mainController.edit);
router.put('/books/edit/:id', mainController.update);
//router.put('/books/edit/:id', mainController.processEdit);

router.delete('/books/:id', mainController.deleteBook);
//rutas busqueda de libros
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
//rutas de autores
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
//rutas de usuario
router.get('/users/register', mainController.register);
router.post('/users/register', mainController.processRegister);
router.get('/users/login', mainController.login);
router.post('/users/login', mainController.processLogin);


module.exports = router;
