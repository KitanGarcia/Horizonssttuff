"use strict";

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Express setup
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var passport = require('passport');
var LocalStrategy = require('passport-local');

var crypto = require("crypto");

// MONGODB SETUP HERE
var mongoose = require("mongoose");
mongoose.connection.on("connected", function()
{
  console.log("Connected to MongoDB!");
});
mongoose.connect(process.env.MONGODB_URI);

// SESSION SETUP HERE
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
app.use(session(
{
  secret: "your secret here",
  store: new MongoStore({mongooseConnection: require("mongoose").connection})
}));

var User = require('./models/models').User;

/*
var cookieSession = require('cookie-session');
app.use(cookieSession({
  keys: ['secret string'],
  maxAge: 100 * 60 * 2
}));*/

app.use(passport.initialize());
app.use(passport.session());


function hashPassword(password)
{
  var hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

// PASSPORT LOCALSTRATEGY HERE
var passwords = require('./passwords.hashed.json');
passport.use(new LocalStrategy(
  function(username, password, done) {
    var hashedPassword = hashPassword(password);
    User.findOne({username: username, password: hashedPassword}, function(error, user)
    {
      if (error)
      {
        done(null, false);
      }
      else
      {
        done(null, user);
      }
    });
  }
));

// PASSPORT SERIALIZE/DESERIALIZE USER HERE HERE
passport.serializeUser(function(user, done) {
  console.log('SERIALIZE', user);
  done(null, user._id);
});
passport.deserializeUser(function(userId, done) {
  console.log('DESERIALIZE');
  User.findById(userId, function(error, user)
  {
    if (error)
    {
      console.log(error);
      done(null, false);
    }
    else
    {
      done(null, user);
    }
  })
});

// PASSPORT MIDDLEWARE HERE
// YOUR ROUTES HERE

app.get('/', function(req, res) {
  console.log('req.session', req.session);
  console.log('req.user', req.user);
  res.render('index', {
    user: req.user
  });
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get("/signup", function(req,res)
{
  res.render("signup");
});

app.post("/signup", function(req,res)
{
  //still need to validate
  var newUser = new User(//is this right?
  {
    username: req.body.username,
    password: hashPassword(req.body.password)
  });
  newUser.save(function(error)
  {
    if (error)
    {
      console.log(error);
    }
    else
    {
      res.redirect("/login");
    }
  });
});

module.exports = app;
