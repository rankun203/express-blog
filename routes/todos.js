var express = require('express');
var todoService = require('../service/todos');

var router = express.Router();

router.post('/', todoService.createTodo);
router.get('/', todoService.findTodo);
router.get('/:id', todoService.findTodo);
router.delete('/:id', todoService.deleteTodo);

module.exports = router;
