var express     = require('express');
var todoService = require('../service/todos');

var router = express.Router();

router.route('/')
  .post(todoService.createTodo)
  .get(todoService.findTodo);

router.route('/:id')
  .get(todoService.findTodo)
  .delete(todoService.deleteTodo)
  .put(todoService.updateTodo);

module.exports = router;
