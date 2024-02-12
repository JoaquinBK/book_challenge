const express = require('express');
const mainRouter = require('./routes/main');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const book = buscarLibroEnBaseDeDatos(bookId); 

  if (book) {
    res.render('bookDetail', { book });
  } else {
    res.status(404).send('Libro no encontrado');
  }
});

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
