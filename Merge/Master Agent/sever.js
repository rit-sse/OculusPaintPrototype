var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var log = require('./logDrawings.js');
var _ = require('underscore');
var net = require('net');
server.listen(8125);
//server.listen(80);
var oculusAgents = [];
var kinectAgents = [];

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log("Connection Made");
    socket.on('my other event', function (data) {
        try {
            res = JSON.parse(data);
        }catch(ex){
            console.log("parse error");
            return;
        }
        id = res.id;
        if(id.substring(0,id.length-1) == "Oculus"){
            console.log("Message from Oculus1");

        }else if(id.substring(0,id.length-1) == "Kinect"){
            console.log("Message from Kinect1");
            log.writeToLog(res.data);

        }
        else {
            console.log("Message not from Oculus or Kinect");
        }
    });
    socket.on('init',function(data){
        console.log("Init Start");
        try {
            console.log(data);
            res = JSON.parse(data);
        }catch(ex){
            console.log("parse error");
            return;
        }
        if(res.from === "Oculus"){
            console.log("Initing Oculus1");
            log.readLog(function(data){
                var obj = JSON.parse(data);
                _.forEach(obj, function(line){
                    socket.emit('data',JSON.stringify(line));
                });
            });

        }else if(res.from === "Kinect"){
            console.log("Initing Kinect1");

        }
        else {
            console.log("Message not from Oculus or Kinect");
        }
    });
});

var tcp_server = net.createServer(function(socket)
{
    console.log("Connection Made");
    socket.on('data', function (data) {
        try {
            var buf = new Buffer(data,"base64")
            console.log("Buff: " + buf);
            res = JSON.parse(buf);
        }catch(ex){
            console.log("parse error");
            return;
        }
        id = res.from;
        if(id.substring(0,id.length-1) == "Oculus"){
            console.log("Message from Oculus1");

        }else if(id.substring(0,id.length-1) == "Kinect" && res.data != ""){
            console.log("Message from Kinect1");
            console.log(res.data);
            log.writeToLog(JSON.stringify(res.data));

        }
        else {
            console.log("Message not from Oculus or Kinect");
        }
    });
    socket.on('init',function(data){
        console.log("Init Start");
        try {
            console.log(data);
            res = JSON.parse(data);
        }catch(ex){
            console.log("parse error");
            return;
        }
        if(res.from === "Oculus"){
            console.log("Initing Oculus1");
            log.readLog(function(data){
                var obj = JSON.parse(data);
                _.forEach(obj, function(line){
                    socket.emit('data',JSON.stringify(line));
                });
            });

        }else if(res.from === "Kinect"){
            console.log("Initing Kinect1");

        }
        else {
            console.log("Message not from Oculus or Kinect");
        }
    });
});
tcp_server.listen(8126);