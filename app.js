const express = require('express');
const nunjucks = require('nunjucks');
const body_parser = require('body-parser');
const pgp = require('pg-promise')({});
const db = pgp({database: 'blog', user: 'postgres'});//if it is local. If it is not, I will have to put url here

var app = express();

nunjucks.configure('views', {
  autoescape: true,  // Keep autoescape on all the time
  express: app,
  noCache: true
});

app.use(body_parser.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.send('narf');
});

app.get('/about', function (request, response) {
  response.send('About Me');
});

app.get('/projects', function (request, response) {
  response.send('Projects');
});

app.get('/post/:slug', function (request, response, next) {
  var slug = request.params.slug;
  
  db.one('SELECT * FROM post WHERE slug=$1', [slug])
   .then(function (results) {
     response.send(results);
   })
   .catch(next);//remember to do this, to pass the error
});

app.get('/hello', function (request, response) {
  var name = request.query.name || 'World';
  var context = {
    title: 'Hello',
    name: name,
    friends: [{name: "Joan"}]
  };
  
  response.render('index.html', context);
});

app.get('/form', function(req, resp) {
  resp.render('form.html');
});

app.post('/submit', function (req, resp) {
  console.log(req.body);
  // if (req.body.fname){
    
  // }
  // resp.send('OK');
  //resp.render('thanks.html');
  
  resp.redirect('/some-where-else');
});


app.listen(8080, function () {
  console.log('Listening on port 8080');
});
