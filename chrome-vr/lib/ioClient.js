var socket = io.connect('http://localhost:8125',{secure:false});

socket.on('connect', function () {
	console.log('client connected');
	//var obj = { size : 20, name: "Jason" };
	//var data = JSON.stringify(obj);
	//socket.emit('data', data);
});
socket.on('disconnect', function(){
	consolelog("opps client disconnect");
});
var lastNode = null;

//handle a drawing event
socket.on('draw', function(data) {
	console.log(data);
	if (lastNode === null | lastNode === {}){
		lastNode = parse(data);
	}else{
		var newNode = parse(data);
		drawLine(lastNode,newNode);
		lastNode = newNode;
	}
});

//handle a movment event
socket.on('move',function(data){
	console.log(data);
	var move = parse(data);
	controls.move(move);
});

socket.on('disconnect', function() {
	console.log('client disconnected');
});
