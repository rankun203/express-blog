'use strict';

/**
 * Created on 7/18/15.
 * @author rankun203
 */

var io = require('socket.io')(8000);

var counter = 1;
setInterval(function () {
    io.emit({
        'id': ++counter,
        'msg': 'msg_' + counter + '_content'
    });
}, 1000);
