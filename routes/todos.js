var express = require('express');
var todoService = require('../service/todos');

var router = express.Router();

router
    .post('/', todoService.createTodo)
    .get('/', todoService.findTodo)
    .get('/:id', todoService.findTodo)
    .delete('/:id', todoService.deleteTodo);

module.exports = router;
