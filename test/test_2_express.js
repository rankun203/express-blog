'use strict';
/**
 * Created on 7/1/15.
 * @author rankun203
 */

var app = require('express')();
var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

mongoose.connect('mongodb://localhost/nodetest2');

function logIp(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Client IP: ', ip);
    next();
}

app.use(logIp);

// http://localhost:3000/todos/5593ebe2b9927a8c492828fa
app.get('/todos/:id', function (req, res, next) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) res.send(err);
        res.json(todo);
    });
});

// http://localhost:3000/todos
app.get('/todos', function (req, res, next) {
    Todo.find(function (err, todos) {
        if (err) res.send(err);
        res.json(todos);
    });
});

app.listen(3000);
