var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8125);
//server.listen(80);
var oculusAgents = [];
var kinectAgents = [];

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        try {
            res = JSON.parse(data);
        }catch(ex){
            console.log("parse error");
            return;
        }
        id = res.id;
        if(id.substring(0,id.length-1) == "Oculus"){
            console.log("Message from Oculus1")
        }else if(id.substring(0,id.length-1) == "Kinect"){
            console.log("Message from Kinect1")
        }
        else {
            console.log("Message not from Oculus or Kinect");
        }
    });
});
