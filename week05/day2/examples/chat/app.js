var express = require('express');
var path = require('path');
var morgan = require('morgan');
var exphbs = require('express-handlebars');
var app = require('express')();
var server = require("http").Server(app);
var io = require('socket.io')(server);

// Set View Engine
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main'
}));
app.set('view engine', 'hbs');

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// Logging
app.use(morgan('combined'));

io.on("connection", function(socket)
{
  var user = "";
  socket.on("username", function(username)
  {
    user = username;
    socket.broadcast.emit("joinedRoom", username);
    socket.emit("welcome", username);
  });

  socket.on("message", function(message)
  {
    console.log(message);
    io.emit("serverMessage", user + ": " + message);
  });
});


app.get('/', function(req, res) {
  res.render('index');
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
  console.log('Express started. Listening on %s', port);
});
