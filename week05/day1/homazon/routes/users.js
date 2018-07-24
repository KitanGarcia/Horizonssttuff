import mongoose from 'mongoose';
import connectMongo from "connect-mongo";
var MongoStore = connectMongo(session);
import express from 'express';
import session from 'express-session';
import passport from 'passport';
/*import LocalStrategy from 'passport-local';*/
import LocalStrategyVar from "passport-local";
var LocalStrategy = LocalStrategyVar.Strategy;

import models from "../models/models.js";

var User = models.User;
var app = express.Router();

mongoose.connect(process.env.MONGODB_URI);

app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        done(err);
      } else if (user && user.password === password) {
        done(null, user);
      } else {
        done(null);
      }
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/*app.use(passport.initialize());
app.use(passport.session());*/


//DOUBLE CHECK THIS. CAME FROM ORIGINAL USERS.JS
app.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


app.get("/login", function(req, res)
{
  res.render("login");
});

app.post("/login", passport.authenticate("local", 
{
  successRedirect: "/",
  failureRedirect: "/login"
}));


/*user.save().then((doc) => {
  // handle response
});
/*

/*user.find().exec().then((docs) => {
  // handle response
});*/

export default app;
