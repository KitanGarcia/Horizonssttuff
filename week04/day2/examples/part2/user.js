"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  gender: String,
  birthday: Date
},{
  toJSON:{
    virtuals:true
  }
});

var ageVirtual = userSchema.virtual("age");
ageVirtual.get(function()
{
  var age = new Date() - this.birthday;
  var seconds = (age/1000);
  var minutes = (seconds/60);
  var hours = (minutes/60);
  var days = hours/24;
  var years = days/365;
  return (Math.floor(years));
})

userSchema.methods.toggleGender = function ()
{
  if (this.gender == "male")
  {
    this.gender = "female";
  }
  else
  {
    this.gender = "male";
  }
//  return this.gender;
}

/*userSchema.method("toggleGender", function()
{
  if (this.gender == "male")
  {
    this.gender = "female";
  }
  else
  {
    this.gender = "male";
  }
  return gender;
});*/

var User = mongoose.model('User', userSchema);

module.exports = User;
