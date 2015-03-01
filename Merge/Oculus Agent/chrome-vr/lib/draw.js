function drawLine(start, stop){

    console.log("Drawing Start: " + start.x + " Stop: " + stop.x);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(start);
    geometry.vertices.push(stop);

    var material = new THREE.LineBasicMaterial({
        color: 0x000000,
        });

    var line = new THREE.Line(geometry, material);

    this.scene.add( line );
}
