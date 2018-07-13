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
  res.render("new")
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
//NEED TO CHECK FOR VALID DATA AND RENDER IF THERE ARE ERRORS
//USE THE VALIDATION CHECKS FROM TODAY
  var project = new Project(
  {
    title: req.body.title,
    goal: req.body.goal,//it was amount before???
    category: req.body.category,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end
  });
  project.save(function(err, results)
  {
    if (err)
    {
      console.log(err);
      res.render("new",
      {
        title: req.body.title,
        goal: req.body.goal,
        category: req.body.category,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end
      });
    }
    else
    {
      console.log(results);
      res.redirect("/");
    }
  });
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res)
{
  Project.findById(req.params.projectid, function(error, result)
  {
    if (error)
    {
      console.log(error);//or could res.send(error)
    }
    else
    {
      res.render("project",
      {
        title: result.title,
        goal: result.goal,
        description: result.description,
        start: result.start,
        end: result.end
      });
    }
  });
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post("/project/:projectid", function(req, res) {
 // YOUR CODE HERE
 var projectID = req.params.projectid;
 var inputName = req.body.Name;
 var inputAmount = req.body.Amount;

 Project.findById({"_id":projectID}, function(error, project){
   if(error){
     res.send(error);
   } else{
     //console.log(project);
     var contrObj = {
       "Name": inputName,
       "Amount": parseInt(inputAmount)
     };

     project.contributions.push(contrObj);
     
     project.update({"_id": projectID}, {contributions: project.contributions}, function(error){
       if(error){
         console.log('here');
         res.send(error);
       } else{
         console.log("SUCCESS");
         //res.redirect(“/project/” + projectID);
         //console.log(project.contributions)
         console.log(project);
         res.redirect("/project/" + req.params.projectid);
//         res.render("project", {project: project, contributions: project.contributions});
       }
     })

     project.save(function(err){
       if(err){
         res.status(500).json(err);
       } else {
         console.log("READ SUCCESS")
       }
     }
     )
     res.render("project", {project: project, contributions: project.contributions, total: totalContributions(project.contributions)});
   }
 });
});










/*
router.post('/project/:projectid', function(req, res) {
  var name = req.body.contName;
  var amount = req.body.contAmount;
  var total = 0;
  Project.findByIdAndUpdate(req.params.projectid, {$push: {"contributions": {name: name, amount: amount}}}, function(error, results)
  {
    if (error)
    {
      res.send(error);
    }
    else
    {
      res.redirect("/project/" + req.params.projectid);
    }
  });
  console.log(req.params.contributions);
  //if there are contributions
  for (var i = 0; i < req.params.projectid.contributions.length; i++)
  {
    total = total + req.params.projectid.contributions[i].amount;
    console.log(total);
  }
    res.render("/project/:projectid", {contributionAmt: total});
});*/



// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

module.exports = router;
