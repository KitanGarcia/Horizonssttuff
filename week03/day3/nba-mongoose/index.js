// Require express and create an express app (Part 2.1)
var express = require('express');
var app = express();

// Require mongoose (Part 2.2)
var mongoose = require('mongoose');

// Require and setup body-parser (Part 4.1)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

// Require the Player model (Part 2.3)
var Player = require('./model/player');

// Require the Roster model (Part 5.2)
var Roster = require('./model/roster');


// Ensure that there is a MONGODB_URI environment variable (source env.sh)
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}


mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});
// Establish mongoose connection to the mongoDB on mlab (Part 2.2)
mongoose.connect(process.env.MONGODB_URI);


/* =====================================
        WRITE ROUTES DOWN HERE
   ===================================== */

// (Part 3.1)
app.get("/", function(req, res)
{
  Player.find(function(error, results)
  {
    if (error)
    {
      console.log("Can't find players");
    }
    else
    {
      res.json(results);
      console.log("Players" + results);
    }
  });
});

// (Part 4.2)
app.post("/addPlayer", function(req, res)
{
  var newPlayer = new Player(
  {
    Name: req.body.apple,
    Points: req.body.Points,
    Rebounds: req.body.Rebounds,
    Assists: req.body.Assists
  });
  newPlayer.save(function(error)
  {
    if (error)
    {
      console.log("Error!!!");
      res.send(error);
    }
    else
    {
      res.redirect("/");
      console.log("No errors!");
    }
  });
});

// (Part 5.3)
app.post("/addPlayerRoster", function(req, res)
{
  console.log("Inside POST");
  console.log(req.body);
  var newRoster = new Roster(
  {
    Name: req.body.name,
    JerseyNumber: req.body.jerseynumber,
    Team: req.body.team
  });
  newRoster.save(function(error)//is this right
  {
    if (error)
    {
      res.send(error);
      console.log("Error in add roster!!!");
    }
    else
    {
      console.log("No errors!");
      res.send("success");
    }
  });
});

app.get("/:rosterid", function(req, res)
{
  console.log("inside rosterid");
  var newObj = {};
  var name = req.params.rosterid;
  Player.find(
    {Name: name},
    function(error, player)
    {
      if (error)
      {
        res.send(error);
      }
      else
      {
        Roster.find(
          {Name: name},
          function(error, roster)
          {
            if (error)
            {
              res.send(error);
            }
            else
            {
              console.log(roster);
              newObj.Name = name;
              newObj.Team = roster[0].Team;
              newObj.JerseyNumber = roster[0].JerseryNumber;
              newObj.Points = player[0].Points;
              newObj.Assists = player[0].Assists;
              newObj.Rebounds = player[0].Rebounds;
              res.send(newObj);
            }
          }
        )
      }
    }
  )
});


// (BONUS)



// Begin listening on port 3000 (Part 2.1)
app.listen(3000, function()
{
  console.log("Listening on port 3000");
});
