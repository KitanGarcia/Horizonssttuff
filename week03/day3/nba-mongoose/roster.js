var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RosterSchema = new Schema({
  Name:{
    type: String,
    required: true
  },
  JerseyNumber: Number,
  Team:{
    type: String,
    required: true
  },
});

module.exports =  mongoose.model('Roster', RosterSchema)

