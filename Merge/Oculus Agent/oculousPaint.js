var time = Date.now();
var effect; // rift effect
var cupola;
var vrstate;
var quat = new THREE.Quaternion();
var quatCam = new THREE.Quaternion();
var xzVector = new THREE.Vector3(0, 0, 1);
var useRift = false;

var cupola = new Cupola({
    "onConnect" : function() {
        console.log("Rift is connected");
    },
    "onDisconnect" : function() {
        console.log("Rift is disconnected");
    },
    "onConfigUpdate" : function(config) {
		console.log("Oculus config updated.");
		riftCam.setHMD(config);      
		onResize();
    },
    "onOrientationUpdate" : function(quatValues) {

		// make a quaternion for the the body angle rotated about the Y axis.
		quat.setFromAxisAngle(bodyAxis, bodyAngle);

		// make a quaternion for the current orientation of the Rift
		
		quatCam.set(quatValues.x, quatValues.y, quatValues.z, quatValues.w);

		// multiply the body rotation by the Rift rotation.
		quat.multiply(quatCam);


		// Make a vector pointing along the Z axis and rotate it accoring to the combined look/body angle.
		//var xzVector = new THREE.Vector3(0, 0, 1);
		xzVector.set(0,0,1);
		xzVector.applyQuaternion(quat);

		// Compute the X/Z angle based on the combined look/body angle.  This will be used for FPS style movement controls
		// so you can steer with a combination of the keyboard and by moving your head.
		viewAngle = Math.atan2(xzVector.z, xzVector.x) + Math.PI;

		// Apply the combined look/body angle to the camera.
		//i need to get the camera
		Draw.camera.quaternion.copy(quat);
    },
});
cupola.connect();

function init() {
	//init the draw object
	drawInit()

	effect = new THREE.OculusRiftEffect( draw.renderer );

	//draw a box

	draw.drawLine(new THREE.Vector3(0,0,-100), new THREE.Vector3(100,100,-100)); 
	draw.drawLine(new THREE.Vector3(100,100,-100), new THREE.Vector3(0,200,-100));
	draw.drawLine(new THREE.Vector3(0,200,-100), new THREE.Vector3(-100,100,-100));
	draw.drawLine(new THREE.Vector3(-100,100,-100), new THREE.Vector3(0,0,-100));


	document.addEventListener( 'keydown', keyPressed, false );
	window.addEventListener('resize', onResize, false);
}
function keyPressed (event) {
	switch ( event.keyCode ) {
		case 81: //q
			socket.emit('data', 'Hello');
	}
}


function animate() {
	console.log("hello");
	vrstate = cupola.getOrientation

	draw.controls.update( Date.now() - time, vrstate );
	
	effect.render( draw.scene, draw.camera, vrstate );

	requestAnimationFrame(animate);

	time = Date.now();
}

function onResize() {
  if(!useRift){
    windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    aspectRatio = window.innerWidth / window.innerHeight;
   
    draw.camera.aspect = aspectRatio;
    draw.camera.updateProjectionMatrix();
   
    draw.renderer.setSize(window.innerWidth, window.innerHeight);
  } else {
    controls.setSize(window.innerWidth, window.innerHeight);
    updateHMDResolution(window.innerWidth, window.innerHeight);
  }
}



function updateHMDResolution(width, height) {

  if (!hmdConfig) {
    hmdConfig = riftCam.getHMD();
  }

  hmdConfig.hResolution = width;
  hmdConfig.vResolution = height;

  riftCam.setHMD(hmdConfig);
}



cupola.connect();
init();
animate();
