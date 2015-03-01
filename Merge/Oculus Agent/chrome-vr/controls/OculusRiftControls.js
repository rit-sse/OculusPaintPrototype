/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Based on THREE.PointerLockControls by mrdoob.
 * @author benvanik
 */

THREE.OculusRiftControls = function ( camera ) {

  var scope = this;

  var moveObject = new THREE.Object3D();
  moveObject.position.y = 10;
  moveObject.add( camera );

  var moveForward = false;
  var moveBackward = false;
  var moveLeft = false;
  var moveRight = false;


  var velocity = new THREE.Vector3();

  var PI_2 = Math.PI / 2;

  this.moveSpeed = 0.12 / 4;

  var _q1 = new THREE.Quaternion();
  var axisX = new THREE.Vector3( 1, 0, 0 );
  var axisZ = new THREE.Vector3( 0, 0, 1 );

  var onKeyDown = function ( event ) {
    console.log(event.keyCode);
    switch ( event.keyCode ) {

      case 38: // up
      case 87: // w
        moveForward = true;
        break;

      case 37: // left
      case 65: // a
        moveLeft = true; break;

      case 40: // down
      case 83: // s
        moveBackward = true;
        break;

      case 39: // right
      case 68: // d
        moveRight = true;
        break;

    }

  }.bind(this);

  var onKeyUp = function ( event ) {

    switch( event.keyCode ) {

      case 38: // up
      case 87: // w
        moveForward = false;
        break;

      case 37: // left
      case 65: // a
        moveLeft = false;
        break;

      case 40: // down
      case 83: // a
        moveBackward = false;
        break;

      case 39: // right
      case 68: // d
        moveRight = false;
        break;

    }

  };

  document.addEventListener( 'keydown', onKeyDown, false );
  document.addEventListener( 'keyup', onKeyUp, false );

  this.enabled = false;

  this.getObject = function () {

    return moveObject;

  };

  this.isOnObject = function ( boolean ) {

    isOnObject = boolean;
    canJump = boolean;

  };

  this.update = function ( delta ) {

    delta *= 0.1;

    velocity.x += ( - velocity.x ) * 0.08 * delta;
    velocity.z += ( - velocity.z ) * 0.08 * delta;

    if ( moveForward ) velocity.z -= this.moveSpeed * delta;
    if ( moveBackward ) velocity.z += this.moveSpeed * delta;

    if ( moveLeft ) velocity.x -= this.moveSpeed * delta;
    if ( moveRight ) velocity.x += this.moveSpeed * delta;

    camera.translateX( velocity.x );
    camera.translateZ( velocity.z );

  };

};
