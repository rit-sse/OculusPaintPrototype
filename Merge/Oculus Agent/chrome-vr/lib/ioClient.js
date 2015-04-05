var socket = io.connect('http://129.21.208.59:8125',{secure:false});
function openConnection(){
	socket.on('connect', function () {
		console.log('client connected');
		socket.emit('init','{"from" : "Oculus"}');
		//var obj = { size : 20, name: "Jason" };
		//var data = JSON.stringify(obj);
		//socket.emit('data', data);
	});
	socket.on('disconnect', function(){
		console.log("opps client disconnect");
	});

	var RHandDraw = null;

	//handle a drawing event
	socket.on('data', function(data) {
		console.log(data);
		//hopfully the json is formed correctly...
		try{
			//Move us if we have moved
			//var d = data.replace(/\"/g,'"');
			var obj = JSON.parse(data);
			console.log("Data: " + data);
			console.log("Obj: " + obj.data);
			//var move = obj.data.Torso;
			//controls.move(move);
			//check to see if the left hand is pressed
			if(obj.data.LHand.active){
				//if it is check if its thouching a box
				lHandPos = new THREE.Vector3(obj.data.LHand.x,obj.data.LHand.y,obj.data.LHand.z);
				colorChange(lHandPos);
			}else{}
			//same as above just all right hand
			if(obj.data.RHand.active){
				console.log("drawing");
				if (RHandDraw === null){
					RHandDraw = new THREE.Vector3(obj.data.RHand.x,obj.data.RHand.y,obj.data.RHand.z);
				}else{
					var rightTemp = new THREE.Vector3(obj.data.RHand.x,obj.data.RHand.y,obj.data.RHand.z);
					drawLine(RHandDraw,rightTemp);
					RHandDraw = rightTemp;
				}
			}else{
				RHandDraw = null;
			}
		}catch(err){
			console.log(err);
		}
	});



	socket.on('disconnect', function() {
		console.log('client disconnected');
	});
}
