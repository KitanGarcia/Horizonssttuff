//require necessary modules
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');
var client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

//setup mongoose connection
mongoose.connection.on('error', function() {
  console.log('error connecting to database')
})
mongoose.connection.on('connected', function() {
  console.log('succesfully connected to database')
})
mongoose.connect(process.env.MONGODB_URI)

//require message model
var Message = require("./models.js").Message;


//setup application configurations
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//ROUTES GO HERE
app.get("/", function(req, res)
{
  Message.find(function(error, messages)
  {
    console.log(messages);
    res.render("viewmessages",
    {
      messages: messages
    });
  });
  
});

//add a route that will respond to post requests sent by Twilio via
//webhooks

app.post("/handletext", function(req, res)
{
  var newMessage = new Message(
  {
    from: req.body.From,
    body: req.body.Body
  }); 
  newMessage.save(function()
  {//ILL DO THIS LATER
    console.log("got in the save!");
  });
  client.messages.create(
  { 
    to: req.body.From, 
    from: req.body.To, 
    body: "This is your twilio phone texting you back"
  })
  res.status(200);
  res.end();
});


//start up our server
var port = process.env.PORT || 3000

app.listen(port)
