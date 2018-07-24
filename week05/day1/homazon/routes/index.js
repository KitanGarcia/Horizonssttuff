import express   from 'express';
import path   from 'path';
import logger   from 'morgan';
import cookieParser   from 'cookie-parser';
import bodyParser   from 'body-parser';
import mongoose from 'mongoose';
import connectMongo from "connect-mongo";
var MongoStore = connectMongo(session);
import session from 'express-session';

import passport from 'passport';
//import LocalStrategy from 'passport-local';

mongoose.connection.on("error", function()
{
  console.log("error connecting to database");
})

mongoose.connection.on("connected", function()
{
  console.log("succesfully connected to database");
})


mongoose.connect(process.env.MONGODB_URI);



/*
app.use(passport.initialize());
app.use(passport.session());*/

/*import routes from './routes/index.js';*/
import users from './users.js';

import models   from "../models/models";
var User = models.User;

var app = express.Router();

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get("/register", function(req, res)
{
  res.render("register");
});


app.post("/register", function(req, res)
{
  console.log("In the post");
  var newUser = new User(
  {
    username: req.body.username,
    password: req.body.password
  });
  newUser.save(function(error)
  {
    if (error)
    {
      console.log(error);
      res.status(400);
      res.json();
    }
    else
    {
      console.log("Dope af");
      res.redirect("/login");
    }
  });
  console.log("New user saved!");
});


app.get("/login", function(req, res)
{
  res.render("login");
});


app.post("/login", passport.authenticate("local", 
{
  successRedirect: "/",
  failureRedirect: "/login",
}));

/*user.save().then((doc) => {
  // handle response
});
/*

/*user.find().exec().then((docs) => {
  // handle response
});*/


export default app;
