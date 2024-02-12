const db = require ('../database/models')

const booksController = {
    create: function (req, res){
        db.books.findAll()
            .then (function(books) {
                return res.render ("newBook", {books: books})
            })
    },
    save: function (req, res){
        db.books.create({
            id: req.body.bookId,
            title: req.body.book_title,
            author: req.body.author_name,
            description: req.body.description,
        });
        res.redirect("/create")
    }
}

module.exports = booksController