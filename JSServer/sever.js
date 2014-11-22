var io = require('socket.io')();

io.on('connection',function(socket){
	console.log("client connected");
	
	socket.on('data',function(data){
		console.log(data);
	})

	socket.on('disconnect', function(data){
		console.log("client disconnected")
	})

})

io.listen(8125);
