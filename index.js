import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';
const app = express();
const port = 3000;
const articles = [];

// Configura il motore di template EJS
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/about', (req, res) => {
  res.render("about.ejs");
})

// Gestisce la richiesta GET alla radice
app.get('/', (req, res) => {
  res.render('index', { articles });
});


// Gestisce la richiesta POST all'endpoint /submit
app.post('/submit', (req, res) => {
  const { autor, title, message } = req.body;
  articles.push({ id: uuidv4(), autor, title, corp: message });
  res.redirect('/');
});

// Gestisce la richiesta GET per l'edit di un articolo
app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const article = articles.find(article => article.id === id);
  if (article) {
    res.render('edit', { article });
  } else {
    res.redirect('/');
  }
});

// Gestisce la richiesta POST per cancellare un articolo
app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = articles.findIndex(article => article.id === id);
  if (index !== -1) {
    articles.splice(index, 1);
  }
  res.redirect('/');
});

// Gestisce la richiesta POST per aggiornare un articolo
app.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { autor, title, message } = req.body;
  const article = articles.find(article => article.id === id);
  if (article) {
    article.autor = autor;
    article.title = title;
    article.corp = message;
  }
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})