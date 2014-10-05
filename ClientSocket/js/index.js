/**
 * Created by Matthew on 10/4/2014.
 */
var app = require('express')();
var client = require('http').Client(app);
var io = require('socket.io-client')(client);
io.

socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});