'use strict';

// Require needed libs
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var io           = require('socket.io');

// Init Mongoose
mongoose.connect('mongodb://localhost/nodetest2', function (err) {
  if (err) console.error('Mongo disconnected', err);
  else console.log('Mongo connected');
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// Include Routes
var routes  = require('./routes/index');
var users   = require('./routes/users');
var blog    = require('./routes/blog');
var todos   = require('./routes/todos');
var crawler = require('./routes/crawler');
var socket  = require('./routes/socket');

// Init ExpressJS
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/views/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'views')));
app.use(require('coffee-middleware')(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/users', users);
app.use('/blog', blog);
app.use('/todos', todos);
app.use('/crawler', crawler);
app.use('/', routes);
socket(app, io);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
