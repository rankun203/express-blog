/**
 * Created on 7/1/15.
 * @author rankun203
 */

var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 2},

  completed: {type: Boolean, required: true},

  note: {type: String, required: true},

  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Todo', TodoSchema);
