var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var fs = require("fs");

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE

console.log(data[1]);

app.get("/", function(req, res)
{
  res.render("index",
  {
    people: data
  });
})


app.get("/male", function(req, res)
{
  var maleArr = [];
  for (var i = 0; i < data.length; i++)
  {
    if (data[i].gender == "Male")
    {
      maleArr.push(data[i]);
    }
  }
  console.log(maleArr);
  res.render("index",
  {
    people: maleArr
  });
})


app.get("/female", function(req, res)
{
  var femaleArr = [];
  for (var i = 0; i < data.length; i++)
  {
    if (data[i].gender == "Female")
    {
      femaleArr.push(data[i]);
    }
  }
  res.render("index",
  {
    people: femaleArr
  });
})

app.listen(3000);



