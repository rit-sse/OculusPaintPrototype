window.addEventListener("load", function(){
  if(navigator.getVRDevices){
    //promis
    navigator.getVRDevices().then(vrDeviceCallback);
  }else if(navigator.mozGetVRDevices){
    //callback
    navigator.mozGetVRDevices(vrDeviceCallback);
  }else{
    console.log("No VR devices found!");
  }
}, false);

function fullScreen(){
  window.addEventListener("keypress", function(e) {
      if (e.charCode == 'f'.charCodeAt(0)) {
          if (renderCanvas.mozRequestFullScreen) {
              renderCanvas.mozRequestFullScreen({
                  vrDisplay: vrHMD
              });
          } else if (renderCanvas.webkitRequestFullscreen) {
              renderCanvas.webkitRequestFullscreen({
                  vrDisplay: vrHMD,
              });
          }
      }
  }, false);
}


function vrDeviceCallback(vrdevs) {
  for (var i = 0; i < vrdevs.length; ++i) {
    if (vrdevs[i] instanceof HMDVRDevice) {
      vrHMD = vrdevs[i];
      break;
    }
  }
  for (i = 0; i < vrdevs.length; ++i) {
    if (vrdevs[i] instanceof PositionSensorVRDevice &&
      vrdevs[i].hardwareUnitId == vrHMD.hardwareUnitId) {
      vrHMDSensor = vrdevs[i];
      break;
    }
  }
  fullScreen();
  initScene();
  initRenderer();
  render();
}

function initScene() {
  camera = new THREE.PerspectiveCamera(60, 1280 / 800, 0.001, 10);
  camera.position.z = 2;
  scene = new THREE.Scene();
  controls = new THREE.OculusRiftControls( camera );
  scene.add(controls.getObject());
  var geometry = new THREE.IcosahedronGeometry(1, 1);
  var material = new THREE.MeshNormalMaterial();
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function initRenderer() {
  renderCanvas = document.getElementById("render-canvas");
  renderer = new THREE.WebGLRenderer({
      canvas: renderCanvas,
  });
  renderer.setClearColor(0x555555);
  renderer.setSize(1280, 800, false);
  vrrenderer = new THREE.VRRenderer(renderer, vrHMD);
}

var time = Date.now();
function render() {
  requestAnimationFrame(render);
  mesh.rotation.y += 0.01;
  var state = vrHMDSensor.getState();
  controls.update(Date.now() - time);
  if(state.orientation !== null){
    camera.quaternion.set(state.orientation.x,
                          state.orientation.y,
                          state.orientation.z,
                          state.orientation.w);
  }else{
    console.log(state);
  }
  vrrenderer.render(scene, camera);
  time = Date.now();
}
