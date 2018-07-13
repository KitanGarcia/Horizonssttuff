"use strict";

var fs = require('fs');
var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Initialize Express
var app = express();
app.use(bodyParser({extended: true}));

// mongoose configuration
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

app.engine('hbs', exphbs({
  extname:'hbs',
  // Add main layout here
  defaultLayout: "main"
}));
app.set('view engine', 'hbs');

console.log('Hello!');


var tokenSchema = new mongoose.Schema(
{
  userId: String,
  token: String,
  createdAt: Date,
});

var userSchema = new mongoose.Schema(
{
  fname: String,
  lname: String,
  email: String,
  password: String,
});

var postSchema = new mongoose.Schema(
{
  poster: Object,
  content: String,
  likes: Array,
  comments: String,
  createdAt: Date,
});

var Token = mongoose.model("Token", tokenSchema);
var User = mongoose.model("User", userSchema);
var Post = mongoose.model("Post", postSchema);


app.post("/api/users/register", function(req, res)
{
  var user = new User(
  {
//NEED TO ADD CHECKS!!!
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(error, results)
  {
    if (error)
    {
      console.log(error);
    }
    else
    {
      res.json({success: true});
    }
  })
});

app.post("/api/users/login", function(req, res)
{
  User.findOne({email: req.body.email}, function(error, user)
  {
    if (error)
    {
      console.log(error);
    }
    else
    {
      console.log(user);
      var newToken = new Token(
      {
        userId: user._id,
        token: user.email + (new Date()).toISOString(),
        createdAt: new Date()
      });
      newToken.save(function(error, results)
      {
        if (error)
        {
          console.log(error);
        }
        else
        {
          res.json(
          {
            success: true,
            response: {id: user._id, token: newToken},
          });
        }
      });
    }
  });
});

app.get("/api/users/logout", function(req, res)
{
  Token.findOne({token: req.query.token}, function(error, token)
  {
    if (error)
    {
      console.log(error);
    }
    else
    {
      token.remove(function(err)
      {
        if (err)
        {
          console.log(err);
        }
        else
        {
          res.json({success: true});
        }
      })
    }
  });
});


app.get("/api/users/posts", function(req, res)
{
  User.findOne({token: req.body.token}, function(error, user)
  {
    if (error)
    {
      console.log(error);
    }
    else
    {
      console.log(user);
    }
  });
});




app.listen(3000, function()
{
  console.log("Listening on port 3000");
});
