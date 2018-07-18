"use strict";

var morgan = require('morgan');
var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var models = require('./models');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var cookieSession = require("cookie-session");
app.use(cookieSession(
{
  name: "session",
  keys: ["This is a SECRET!!!"]
}))

// Secrets default to their name, unless there are process.ENV overrides
function getSecret(key) {
  return process.env[key] || key;
}

app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'main'}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined'));


/*================== STAGE 1: Client-side login ==================*/ 
app.get('/', function(req, res) {
  res.render('stage1', {
    stage2: getSecret('stage2')
  });
});

/* ---------- Add your new POST '/' endpoint here ---------- */
app.post('/', function(req, res)
{
  if (req.body.password === "gingerbread")
  {
    res.redirect("/stage2");
  }
  else
  {
    res.redirect("/");
  }
});


/*================== STAGE 2: Insecure cookies ==================*/
app.get('/' + getSecret('stage2'), function(req, res) {
  /* ---------- cookie value gets pulled here ---------- */
  var userCookieValue = req.session.cookieName;
  res.render('stage2', {
    user: userCookieValue,
    admin: userCookieValue === 'admin',
    stage3: getSecret('stage3')
  });
});

app.post('/' + getSecret('stage2'), function(req, res) {
  console.log(req.body);
  if (req.body.username === 'bob' && req.body.password === 'baseball') {
    /* ---------- Bob's cookie gets set here ---------- */
    console.log("bob set");
    req.session.cookieName = "bob";
    res.redirect('/' + getSecret('stage2'));
  } else {
    res.sendStatus(401);
  }
});


/*================== STAGE 3: MongoDB injection ==================*/
app.get('/' + getSecret('stage3'), function(req, res) {
  res.render('stage3',{
    stage3: getSecret('stage3')
  });
});

app.post('/' + getSecret('stage3'), function(req, res) {
  var secret = req.body.secret;
  if (typeof secret === "string" || secret instanceof String)
  {
  // ---------- check secret here ----------
    models.Secret.findOne({
      secret: secret
    }, function(error, secret) {
      if (error) {
        res.status(400).json({
          error: error
        });
      } else if (!secret) {
        res.status(401).json({
          error: "Incorrect key"
        });
      } else {
        secret.stage4url = "/" + getSecret('stage4');
        res.json({
          secret: secret
        });
      }
    });
  }
  else
  {
    res.status(400).json(
    {
      error: "yo its not a string doe"
    });
  }
});
/*================== EXERCISE 2 ROUTES ==================*/
app.use('/exercise2', require('./exercise2'));

app.listen(process.env.PORT || 3000);
