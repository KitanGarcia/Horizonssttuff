var mongoose = require('mongoose');
var Schema = mongoose.Schema

var contactSchema = new Schema(
{
  name: String,
  phone: String,
  birthday: Date
});


var Contact = mongoose.model("Contact", contactSchema);

module.exports = {Contact: Contact};
