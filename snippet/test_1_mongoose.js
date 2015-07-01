/**
 * Created on 7/1/15.
 * @author rankun203
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodetest2');

var TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String,
    updated_at: {type: Date, default: Date.now}
});

var Todo = mongoose.model('Todo', TodoSchema);


// Mongoose Create
var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there...'});
todo.save(function (err) {
    if (err)
        console.log(err);
    else
        console.log(todo);
});

// You can also build the object and save in one step using create:
var todo1 = {
    name: 'Master Javscript',
    completed: true,
    note: 'Getting better everyday'
};
Todo.create(todo1,
    function (err, todo) {
        if (err) console.log(err);
        else console.log(todo);
    });

// Define a global callback
var callback = function (err, data) {
    if (err) throw err;
    else console.log(data);
};
Todo.find({completed: true}, callback);
