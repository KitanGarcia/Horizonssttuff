// YOUR CODE HERE
var fs = require("fs");
var express = require("express");
var app = express();

var poem = fs.readFileSync("./poem.txt", "utf8");

app.get("/", function(req, res)
{
  res.send("The Horizons Poet API v1.0");
});


app.get("/api/poem", function(req, res)//this needs to happen before the following use or else the api/* condition will be met
{
  res.send(poem);
});


app.use("/api/*", function(req, res)
{
  res.send("We couldn't find any routes matching this endpoint");
});



app.post("/api/success", function(req, res)
{
  res.json({success: true});//send it as a json
});

app.listen(3000);
