var Todo = require('../models/Todo');

function cb(res, err, data) {
  if (err)
    res.status(500).send(err).end();
  else if (data == null)
    res.status(404).end();
  else
    res.json(data);
}

var TodoService = {
  createTodo: function (req, res, next) {
    var body = req.body;
    var todo = new Todo({
      name: body.name,
      completed: body.completed || false,
      note: body.note || 'Todo note...'
    });

    Todo.create(todo, function (err, data) {
      cb(res, err, data);
    });
  },

  findTodo: function (req, res, next) {
    if (req.params.id)
      Todo.findById(req.params.id, function (err, data) {
        cb(res, err, data);
      });
    else
      Todo.find(function (err, data) {
        cb(res, err, data);
      });
  },

  updateTodo: function (req, res, next) {
    Todo.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
      TodoService.findTodo(req, res);
    });
  },

  deleteTodo: function (req, res, next) {
    Todo.findByIdAndRemove(req.params.id, function (err, data) {
      cb(res, err, data);
    });
  }
};

module.exports = TodoService;
