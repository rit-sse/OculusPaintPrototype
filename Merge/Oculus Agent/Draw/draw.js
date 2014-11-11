var Draw = function(renderer, scene, camera, controls){
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.lineColor = 0x000000;
    this.lineWidth = 5;
}

Draw.prototype.setColor = function(color){
    this.lineColor = color;
}

Draw.prototype.setWidth = function(width){
    this.linewidth = width;
}

Draw.prototype.drawLine = function(start, stop){

    console.log("Drawing Start: " + start.x + " Stop: " + stop.x);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(start);
    geometry.vertices.push(stop);

    var material = new THREE.LineBasicMaterial({
        color: this.lineColor,
        linewidth: this.lineWidth
        });

    var line = new THREE.Line(geometry, material);

    this.scene.add( line );
}
var draw = new Draw();

function drawInit(){
    var camera, scene, renderer;
    var controls;
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

    var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    var light = new THREE.DirectionalLight( 0xffffff, 0.75 );
    light.position.set( -1, - 0.5, -1 );
    scene.add( light );

    controls = new THREE.OculusRiftControls( camera );
    scene.add( controls.getObject() );

    // floor
    var segments = 80;

    var geometry = new THREE.PlaneGeometry(1000, 1000, segments, segments);
    var matEven = new THREE.MeshBasicMaterial({
        color: 0xFF0000
    });
    var matOdd = new THREE.MeshBasicMaterial({
        color: 0x00FF00
    });

    var materials = [matEven, matOdd];
    var i,x,y;
    for (x=0; x < segments ; x++){
        for (y = 0; y < segments; y++){
            i = x * segments + y;
            geometry.faces[i].materialIndex = (x + y) % 2;
        }
    }

    var floor = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials))

    floor.position.y = -1.9;//make it on the ground
    floor.rotation.x = -Math.PI/2; //rotate it to the ground

    scene.add(floor);

    renderer = new THREE.WebGLRenderer({
        devicePixelRatio: 1,
        alpha: false,
        clearColor: 0xffffff,
        antialias: true
    });
    draw = new Draw(renderer,scene, camera,controls);
}