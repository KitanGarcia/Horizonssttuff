var express = require('express');
var router = express.Router();

var models = require("../models/models.js");
var User = models.User;
var Contact = models.Contact;
var Message = models.Contact;

var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
var fromNumber = process.env.MY_TWILIO_NUMBER; // Your custom Twilio number
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

/* GET home page. */

router.get("/contacts", function(req, res)
{
  Contact.find({owner: req.user._id}, function(error, results)//find results are an array of objects
  {
    res.render("contacts",
    {
      contact: results//use contact in handlebars
    });
  });
});


router.get("/contacts/new", function(req, res)
{
  res.render("editContact",
  {
    path: "/contacts/new"
  });
});


router.get("/contacts/:id", function(req, res)//
{
  Contact.findById(req.params.id, function(error, result)//findById result is one object
  {
    res.render("editContact",
    {
      contact: result
    });
  });
});


router.post("/contacts/new", function(req, res)
{
  var newContact = new Contact(
  {
    name: req.body.name,
    phone: req.body.phone,
    owner: req.user._id
  });
  newContact.save(function(error)
  {
    if (error)
    {
      console.log(error);
    }
    else
    {
      res.redirect("/contacts");
    }
  });
});


router.post("/contacts/:id", function(req, res)
{
  Contact.findByIdAndUpdate(req.params.id, {name: req.body.name, phone: req.body.phone}, function(error, result)
  {
    if (error)
    {
      console.log(error);
    }
    else
    {
      res.redirect("/contacts");
    }
  })
});


//TWILIO STARTS HERE
router.get("/messages", function(req, res)
{
  Message.find({user: req.user._id})///DOUBLE CHECK
    .populate("contact")
    .exec(function(error, results)
    {
      res.render("messages",
      {
        message: results
      });
    })
});


router.get("/messages/:contactId", function(req, res)
{
  Message.find({user: req.user._id, contact: req.params.contactId})
    .populate("contact")
    .exec(function(error, results)
    {
      if (error)
      {
        res.status(500);
        res.json(error)
      }
      else
      {
        res.render("messages",
        {
          messages: results
        })
      }
    })
});


/*UPDATE POST /MESSAGES/SEND:CONTACTID!!!    to include status and from strings?*/
router.get("/messages/send/:contactId", function(req, res)
{
  Message.find({contact: req.params.contactId}, function(error, contact)
  {
    console.log("in post129: rendering...");
    console.log("contactid", req.params.contactId);
    res.render("newMessage",
    {
      potato: req.params.contactId
    });
  })
});



router.post("/messages/send/:contactId", function(req, res)
{
  Contact.findById(req.params.contactId, function(error, contact)
  {
    console.log("in post142");
    if (error)
    {
      res.status(500);
      res.json(error);
    }
    else
    {
      var data = 
      {
        body: req.body.messageBody,
        to: "+1" + contact.phone,
        from: fromNumber//is this right?
      }
      client.messages.create(data, function(error, message)
      {
        if (error)
        {
          res.status(500);
          res.json(error);
        }
        else
        {
          console.log("Creating new Message");
          var newMessage = new Message(
          {
            created: new Date(),
            content: req.body.messageBody,
            user: req.user._id,
            contact: req.params.contactId,
            channel: "SMS"
          });
          console.log("Message created");
          newMessage.save(function(error)
          {
            if (error)
            {
              console.log(error);
              res.end();
            }
            else
            {
              res.redirect("/messages")//Should this go to individual msgs nstead?
              console.log("Finished redirect!");
            }
          });
          console.log("Message saved!");
        }
      })
    }
  })
});

/*router.post("/message/receive", function(req, res)
{
  {//double check all these
    Body: req.body.Body,
    From: req.body.From,//"+1" + contact.phone,
    To: req.body.To//fromNumber//is this right?
  }
});*/

module.exports = router;
