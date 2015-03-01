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

var LHandDraw = null;
var RHandDraw = null;

//handle a drawing event
socket.on('data', function(data) {
	console.log(data);
	//hopfully the json is formed correctly...
	try{
		//Move us if we have moved
		var obj = JSON.parse(data);
		var move = obj.data.torso;
		controls.move(move);

		//check to see if the left hand should be drawing
		//if not set LHand to null
		if(data.LHand.active){
			//if LHandDraw is null set it
			//else draw a line with the new data and LHandDraw then swap
			if (LHandDraw === null){
				LHandDraw = new THREE.Vector3(data.LHand.x,data.LHand.y,data.LHand.z);
			}else{
				var leftTemp = new THREE.Vector3(data.LHand.x,data.LHand.y,data.LHand.z);
				drawLine(LHandDraw,leftTemp);
				LHandDraw = leftTemp;
			}
		}else{
			LHandDraw = null;
		}
		//same as above just all right hand
		if(data.RHand.active){
			if (RHandDraw === null){
				RHandDraw = new THREE.Vector3(data.RHand.x,data.RHand.y,data.RHand.z);
			}else{
				var rightTemp = new THREE.Vector3(data.RHand.x,data.RHand.y,data.RHand.z);
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