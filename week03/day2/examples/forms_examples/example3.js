var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var data = require("./accounts");
var app = express();

console.log(data);

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require("body-parser");
app.use(bodyParser({extended: true}));

app.get('/', function(req, res) {
  res.render('example3');
});

// start the express app
var port = process.env.PORT || 3000;
console.log('Express started. Listening on port %s', port);



app.post('/login', function(req, res) {
  var dname = "";
  var hasName = false;
  for (var i = 0; i < data.length; i++)
  {
    if (data[i].email == req.body.email && data[i].password == req.body.password)
    {
      dname = data[i].first_name;
      hasName = true;
    }
  }
  res.render('example3',
  {
    email: req.body.email,
    password: req.body.password,
    name: dname,
    exists: hasName
  });
});

app.listen(port);

module.exports = app;
