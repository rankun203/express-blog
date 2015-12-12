"use strict";
/**
 * Created on 7/20/15.
 * @author rankun203
 */

module.exports = function (app, io) {
  app.post('/socket', function (req, res) {
    var time = new Date().toDateString();

    io.sockets.emit('connected', true);
    response.json(200, {
      msg: 'ok'
    });
  })
};
