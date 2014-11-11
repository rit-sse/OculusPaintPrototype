/**
wraps the camera object in a custum object

**/

var THREE.KinectControls = function(camera){

	var scope = this;

	var moveObject = new THREE.Object3D();
	moveObject.position.y = 10;
	moveObject.add( camera );

	var position = new THREE.Vector3();

	this.getObject = function(){
		return moveObject;
	};

	this.move = function(newPose){
		position.x = newPose.x;
		position.y = newPose.y;
		position.z = newPose.z;
	}

	//delta Time passed since last update
	//vrstate the possiton of the oculous rift
	this.update = function ( delta, vrstate ){
		var rotation = new THREE.Quaternion();
		var angles = new THREE.Vector3();
		if (vrstate) {
			rotation.set(
					vrstate.hmd.rotation[0],
					vrstate.hmd.rotation[1],
					vrstate.hmd.rotation[2],
					vrstate.hmd.rotation[3]);
			angles.setEulerFromQuaternion(rotation, 'XYZ');
			angles.z = 0;
			angles.normalize();
			rotation.setFromEuler(angles, 'XYZ');
			rotation.normalize();
			position.applyQuaternion(rotation);
		}

		moveObject.translateX( position.x );
		moveObject.translateY( position.y );
		moveObject.translateZ( position.z );
	};
}

