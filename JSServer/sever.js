var io = require('socket.io')();
var oculusAgents = [];
var kinectAgents = [];

io.on('connection',function(socket){
	console.log("client connected");
	
	socket.on('data',function(data){
		console.log(data);
	});

	socket.on('oculusConnect',function(){
		oculusAgents.push(socket);
	});

	socket.on('kinectConnect', function(){
		kinectAgents.push(socket);
	})

	socket.on('disconnect', function(data){
		console.log("client disconnected")
		
	});

});

io.listen(8125);
