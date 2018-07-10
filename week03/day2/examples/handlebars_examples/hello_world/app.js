var express = require("express");
var handlebars = require("express-handlebars");
var app  = express();

app.engine("hbs", handlebars(
{
  extname: ".hbs"//when it tries to render an hbs file, use handlebars
}));
app.set("view engine", "hbs");//use hbs files as the default view engine

app.get("/", function(req, res)
{
  res.render("myFirstTemplate",
  {
  });
})


app.get("/:error", function(req, res)//:error creates the variable error
{
  var error = req.params.error || "placeholder";
  res.send(error + " page not found, did you enter the correct url?");
})

app.listen(3000);
