/**
wraps the camera object in a custum object
**/

THREE.KinectControls = function(camera){

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

  //delta Time passed since last update *Notused*
  //vrstate the possiton of the oculous rift *Notused*
  this.update = function (delta, vrstate ){

    moveObject.translateX( position.x );
    moveObject.translateY( position.y );
    moveObject.translateZ( position.z );
  };
};

