/**
wraps the camera object in a custum object

**/

var THREE.KinectControls = function(camera){

	var scope = this;

	var moveObject = new THREE.Object3D();
	var position = new THREE.Vector3();
	moveObject.position.y = 10;
	moveObject.add( camera );



	this.getObject = function(){
		return moveObject;
	};

	this.move = function(newPose){
		position.x = newPose.x;
		position.y = newPose.y;
		position.z = newPose.z;
	};

	//delta Time passed since last update
	//vrstate the possiton of the oculous rift
	this.update = function ( delta, vrstate ){

		// var rotation = new THREE.Quaternion();
		// var angles = new THREE.Vector3();
		// if (vrstate) {
		// 	rotation.set(
		// 			vrstate.x,
		// 			vrstate.y,
		// 			vrstate.z,
		// 			vrstate.w);
		// 	angles.setEulerFromQuaternion(rotation, 'XYZ');
		// 	angles.z = 0;
		// 	angles.normalize();
		// 	rotation.setFromEuler(angles, 'XYZ');
		// 	rotation.normalize();
		// 	position.applyQuaternion(rotation);
		// }

		moveObject.translateX( position.x );
		moveObject.translateY( position.y );
		moveObject.translateZ( position.z );
	};
};

