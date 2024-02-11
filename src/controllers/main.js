const bcryptjs = require('bcryptjs');
const db = require('../database/models');

const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
    },  
    create: function(req, res) {
      db.library.create({
      product_name: req.body.product_name,
      description: req.body.description,
      image: req.file.filename,
      date: req.body.date,
      price: req.body.price
    })
    .then(function(result) {
      return db.library.findAll();
    })
    .then(function(productos) {
      res.render(path.join(__dirname, "../views/bookDetails"), { book, req });
    })
    .catch(function(error) {
      console.error("Error al crear el producto:", error);
      res.status(500).send("Error interno del servidor");
    });
  },
  bookDetail: (req, res) => {
    db.Book.findByPk(req.params.id, {
      include: [{ association: 'authors' }]
    })
      .then((book) => {
        res.render('bookDetail', { book });
      })
      .catch((error) => console.log(error));
  },

  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: (req, res) => {
    // Implement search by title
    res.render('search');
  },
  
  updateBook: (req, res) => {
    db.Book.update(
      {
        
        title: req.body.title,
        // Update other fields as needed
      },
      {
        where: { id: req.params.id }
      }
    )
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  
  deleteBook: (req, res) => {
    db.Book.destroy({
      where: { id: req.params.id }
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  
  
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
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  edit: (req, res) => {
    // Implement edit book
    res.render('editBook', {id: req.params.id})
  },
  processEdit: (req, res) => {
    // Implement edit book
    res.render('home');
  }
};

module.exports = mainController;
