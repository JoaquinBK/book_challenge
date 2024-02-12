const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const mainController = {
  //listado de libros
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
    }, 
    create: (req, res) => {
      res.render( 'newBook' );
    },
      //detalle de libros
  bookDetail: (req, res) => {
    db.Book.findByPk(req.params.id, {
      include: [{ association: 'authors' }]
    })
      .then((book) => {
        res.render('bookDetail', { book });
      })
      .catch((error) => console.log(error));
  },
    //guardado del libro creado
  save: function(req, res) {
    const Book = db.Book;
    const Author = db.Author;
  
    let bookData = {
      title: req.body.book_title,
        description: req.body.description
    };  
    let createdBook;
  
    Book.create(bookData)
    .then(function(book) {
      createdBook = book;
      return Author.findOrCreate({
        where: { name: req.body.author_name }
      });
    })
      .then(function([author, created]) {
          return createdBook.addAuthor(author);
      })
      .then(function() {
          return Book.findAll();
      })
      .then(function(books) {
          res.redirect("/");
      })
      .catch(function(error) {
          console.error("Error al crear el libro:", error);
          res.status(500).send("Error interno del servidor");
      });
  },
    //edicion de libros
    edit: async (req, res) => {
      let findBook = await db.Book.findByPk(req.params.id)
      console.log(findBook);
      res.render('editBook', {findBook})
    },
    update: async (req, res) => {
      try {
        let updateBook = await db.Book.findByPk(req.params.id);
        await updateBook.update({
          title: req.body.title,
          cover: req.body.cover,
          description: req.body.description
        });
        res.redirect('/')
      } catch (error) {
        console.error("Error al procesar la edición del libro:", error);
        res.status(500).send("Error interno del servidor");
      }
    },
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: (req, res) => {
    // Implement search by title
    res.render('search');
  },
  //borrado de libros
  // deleteBook: (req, res) => {
  //   db.Book.destroy({
  //     where: { id: req.params.id }
  //   })
  //     .then(() => {
  //       res.redirect('/');
  //     })
  //     .catch((error) => console.log(error));
  // },
//   deleteBook: async (req, res) => {
//     try {
//         // Eliminar las relaciones del libro con los autores
//         await db.Book.findByPk(req.params.id)
//             .then(book => {
//                 if (!book) throw new Error('Libro no encontrado');
//                 return book.removeAuthors();
//             });

//         // Eliminar el libro
//         await db.Book.destroy({
//             where: { id: req.params.id }
//         });

//         res.redirect('/');
//     } catch (error) {
//         console.error("Error al eliminar el libro:", error);
//         res.status(500).send("Error interno del servidor");
//     }
// },
deleteBook: async (req, res) => {
  try {
      // Eliminar las relaciones del libro con los autores en la tabla intermedia
      let test = await db.Book.findByPk(req.params.id, {
        include: [{ association: 'authors' }]
      })
      console.log(test);
      // await db.BooksAuthors.destroy({
      //     where: { BookId: req.params.id }
      // });

      // // Eliminar el libro
      // await db.Book.destroy({
      //     where: { id: req.params.id }
      // });

      res.redirect('/');
  } catch (error) {
      console.error("Error al eliminar el libro:", error);
      res.status(500).send("Error interno del servidor");
  }
},
  //lista de autores
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    // Implement books by author
    res.render('authorBooks');
  },
  //registro de usuarios
  register: (req, res) => {
    res.render('register');
  },

  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  //login  de usuarios
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  }
};

module.exports = mainController;
