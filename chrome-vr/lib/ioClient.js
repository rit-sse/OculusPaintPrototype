var socket = io.connect('http://localhost:8125',{secure:false});

socket.on('connect', function () {
	console.log('client connected');
	var obj = { size : 20, name: "Jason" };
	var data = JSON.stringify(obj);
	socket.emit('data', data);
});
socket.on('disconnect', function(){
	consolelog("opps client disconnect");
});
var lastNode = null;

socket.on('data', function(data) {
	console.log("Here");
	console.log(data);
	if (lastNode === null){
		lastNode = parse(data);
	}else{
		var newNode = parse(data);
		draw.drawLine(lastNode,newNode);
		lastNode = newNode;
	}
});
socket.on('disconnect', function() {
	console.log('client disconnected');
});
