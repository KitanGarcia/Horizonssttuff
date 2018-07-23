var express = require('express');
var router = express.Router();
var models = require("../models/models.js");
var User = models.User;
var Contact = models.Contact;

var expressValidator = require('express-validator');
router.use(expressValidator());

module.exports = function(passport) {
  // Add Passport-related auth routes here, to the router!
  // YOUR CODE HERE
router.get('/', function(req, res, next) {
  // Your code here.
  if (req.user)
  {
    res.redirect("/contacts");
  }
  else
  {
    res.redirect("/login");
  }
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

//validate user fields
router.post('/signup', function(req, res, next) {
  req.check("username", "Username is required").notEmpty();
  req.check("password", "Password is required").notEmpty();
  req.check("passwordRepeat", "Password is required").notEmpty();
  req.assert("passwordRepeat", "Passwords not equal").equals(req.body.password);

  var errors = req.validationErrors();
  if (errors)
  {
    //fill this in
    console.log(errors);
  }
  else
  {
    var newUser = new User(
    {
      username: req.body.username,
      password: req.body.password,
      phone: ""
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
  }
});

router.get("/login", function(req, res, next)
{
  res.render("login");//IS THIS IT???
});

router.post("/login", passport.authenticate("local",
{
  //use passport.authenticate("local")
  successRedirect: "/contacts",
  FailureRedirect: "/login",
  //if successful, redirect to /contact
  //else redirect to /login
}));

router.get("/logout", function(req, res, next)
{
  //terminate session
  req.logout();
  res.redirect("/login");
});

module.exports = router;

  return router;
}
