"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project'
  });
  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  Project.find(function(error, results)
  {
    if (error)
    {
      console.log(error);//or could res.send(error)
    }
    else
    {
      res.render("index",
      {
        project: results
      });
    }
  });
  
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  res.render("new",
  {
    title: "Create new project"//Is this what it wants
  });
/*
    title: res.title,//should these all be objects?
    goal: res.goal,
    description: res.description,
    start: res.start,
    end: res.end*/
 // });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
//NEED TO CHECK FOR VALID DATA AND RENDER IF THERE ARE ERRORS
  var project = new Project(
  {
    title: req.body.title,
    goal: req.body.amount,
    category: req.body.category,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end
  });
  project.save(function(err)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      res.redirect("/");
    }
  });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
