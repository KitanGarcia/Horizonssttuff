"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model("Cat",
{
  name: String,
  furcolor: String
}); // YOUR CODE HERE - define the cat model


var crooks = new Cat(
{
  name: "Crookshanks",
  furcolor: "Black"
}); // YOUR CODE HERE - define the cat model

crooks.save(function(err)
{
  if (err)
  {
    console.log("failed", err);
  }
  else
  {
    console.log("saved");
  }
});

var biggles =new Cat(
{
  name: "Mr. Bigglesworth",
  furcolor: "White"
}); // YOUR CODE HERE - define the cat model

biggles.save(function(err)
{
  if (err)
  {
    console.log("failed", err);
  }
  else
  {
    console.log("saved");
  }
});

var empur = new Cat(
{
  name: "Empurress",
  furcolor: "Calico"
}); // YOUR CODE HERE - define the cat model

empur.save(function(err)
{
  if (err)
  {
    console.log("failed", err);
  }
  else
  {
    console.log("saved");
  }
});

Cat.findOne(function(error, cats)
{
  if (error)
  {
    console.log("can't find cat", error);
  }
  else
  {
    console.log("found cat", cats);
  }
});

Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});
