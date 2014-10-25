/**
 * Created by Matthew on 10/25/2014.
 */


var io = require('socket.io-client');
var socket = io.connect('http://localhost');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});