var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;
var Follow = models.Follow;
var Tweet = models.Tweet;

// THE WALL - anything routes below this are protected by our passport (user must be logged in to access these routes)!
router.use(function(req, res, next){
  if (!req.user) {
    res.redirect('/login');
  } else {
    return next();
  }
});

router.get('/', function(req, res) {
  res.send("Success! You are logged in.");
});

router.get('/users/', function(req, res, next) {


  // Gets all users

});


router.get('/users/:userId', function(req, res, next) {
  // Gets all information about a single user
  User.findById(req.params.userId, function(error, user)
  {
    if (error)
    {
      console.log(error);
    }
    else
    {
      res.render("singleProfile",
      {
        user: user
      });
    }
  });
});


  // Creates a follower

router.post('/users/:userId/follow', function(req, res) {
  // Create a new follower
//FINISH THISSSS!  req.user.follow
 req.user.follow(req.params.userId, function(err)
 {
   if (err)
   {
     console.log(err);
     res.send(err.message);
   }
   else
   {
     res.redirect("/users/" + req.params.userId);
   }
 });
});


router.get('/tweets/', function(req, res, next) {

  // Displays all tweets in the DB

});


router.post('/tweets/:tweetId/likes', function(req, res, next) {

  //Should add the current user to the selected tweets like list (a.k.a like the tweet)

});


router.get('/tweets/new', function(req, res, next) {

  //Display the form to fill out for a new tweet

});


router.post('/tweets/new', function(req, res, next) {

  // Handle submission of new tweet form, should add tweet to DB


});

module.exports = router;
