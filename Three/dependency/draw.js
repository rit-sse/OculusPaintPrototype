var Draw = function(renderer, scene, camera){
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
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
