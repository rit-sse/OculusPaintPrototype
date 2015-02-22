/**
 * Created by Matthew on 2/22/2015.
 */
var socket = io.connect('http://localhost:8125');
socket.on('news',function(data){
    console.log(data);
    mess = '{"id": "Oculus0","data": {"LHand": {"X": 1,"y": 1,"z": 1},"RHand": {"X": 2, "y": 2, "z": 2}, "Torso": {"x": 3, "y": 3, "z": 3}}}'
    socket.emit('my other event',mess);
});

socket.on('connect',function() {
    console.log('Client has connected to the server!');
});
// Add a connect listener
socket.on('message',function(data) {
    console.log('Received a message from the server!',data);
});
// Add a disconnect listener
socket.on('disconnect',function() {
    console.log('The client has disconnected!');
});

// Sends a message to the server via sockets
function sendMessageToServer(message) {
    console.log("sending message to server");
    socket.emit('msg',message);
};