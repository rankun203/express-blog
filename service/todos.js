var Todo = require('../models/Todo');

module.exports = {
    createTodo: function (req, res, next) {
        Todo.create(req.body, function (err, data) {
            if (err) res.send(err);
            else res.json(data);
        });
    },

    findTodo: function (req, res, next) {
        Todo.find(req.body, function (err, data) {
            if (err) res.send(err);
            else res.json(data);
        });
    },

    updateTodo: function (req, res, next) {

    },

    deleteTodo: function (req, res, next) {

    }
};