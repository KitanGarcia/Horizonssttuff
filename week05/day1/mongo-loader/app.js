var express = require('express');
var app = express();

['MONGODB_URI'].map(k => {
  if (! process.env[k]) {
    console.error('Missing environment variable', k, 'Did your source env.sh');
    process.exit(1);
  }
});

var hbs = require('express-handlebars')({
  defaultLayout: 'main',
  extname: '.hbs'
});
app.engine('hbs', hbs);
app.set('view engine', 'hbs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var Movie = mongoose.model('Movie', {
  title: {
    type: String,
    required: true
  },
  url: String,
  photo: {
    type: String,
    required: true
  },
  year: String,
  rating: String
});

app.get('/', function(req, res) {
  Movie.find(function(err, movies) {
    res.render('index', {
      movies: movies
    });
  });
});

mongoose.Promise = Promise;

app.post('/load', function(req, res) {
  // Load all these movies into MongoDB using Mongoose promises
  // YOUR CODE HERE
  var movies = require('./movies.json');
  console.log("got movies");
  var promiseArr = [];
  movies.map(function(movie)
  {
    var newMovie = new Movie(
    {
      url: movie.url,
      title: movie.title,
      photo: movie.photo,
      year: movie.year,
      rating: movie.rating
    });
    promiseArr.push(newMovie);
    newMovie.save(function(error)
    {
      if (error)
      {
        console.log(error);
      }
      else
      {
        console.log("Cool, it worked");
      }
    });
  });
  console.log("promise array: ", promiseArr);
  // Do this redirect AFTER all the movies have been saved to MongoDB!
  Promise.all(promiseArr)
    .then(function()
    {
      console.log("Got to redirect!");
      res.redirect('/');
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Express started, listening to port: ', port);
});
