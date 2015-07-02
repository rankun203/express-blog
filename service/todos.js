var Todo = require('../models/Todo');

module.exports = {
    createTodo: function (req, res, next) {
        Todo.create(req.body, function (err, data) {
            if (err) res.send(err);
            else res.json(data);
        });
    },

    findTodo: function (req, res, next) {
        if (req.params.id)
            Todo.findById(req.params.id, function (err, data) {
                if (err) throw err;
                else res.json(data);
            });
        else
            Todo.find(function (err, data) {
                if (err) throw err;
                else res.json(data);
            });
    },

    updateTodo: function (req, res, next) {

    },

    deleteTodo: function (req, res, next) {

    }
};