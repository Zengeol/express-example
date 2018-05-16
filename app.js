var express = require('express');
var nunjucks = require('nunjucks');

var app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

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

app.get('/post/:slug', function (request, response) {
  var slug = request.params.slug;
  response.send('Post About: ' + slug);
});

app.get('/hello', function (request, response) {
  var name = request.query.name || 'World';
  var context = {title: 'Hello', name: name};
  
  response.render('index.html', context);
});


app.listen(8080, function () {
  console.log('Listening on port 8080');
});
