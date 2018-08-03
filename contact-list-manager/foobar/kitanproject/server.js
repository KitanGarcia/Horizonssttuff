const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var model = require("./src/model.js");
var Contact = model.Contact;

mongoose.connection.on('connected', function()
{
 console.log('Connected to MongoDb');
});

mongoose.connect(process.env.MONGODB_URI);

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));


app.post('/contact/create', function(req, res)
{
var newContact = new Contact(
{
  name: req.body.name,
  phone: req.body.phone,
  birthday: req.body.birthday
});

newContact.save(function(error)
{
  if (error)
  {
    console.log(error);
    res.status(500).json({status: false});
  }
  else
  {
    res.status(200).json({status: true});
  }
});
  
});





app.get('/ping', function (req, res) {
 return res.send('pong');
});

// DO NOT REMOVE THIS LINE :)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1337);
