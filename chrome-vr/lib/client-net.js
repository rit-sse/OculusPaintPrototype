//used to parse our json objects
function parse( jsonObject){
    console.log("Parse");
    console.log(jsonObject);
    var obj = JSON.parse(jsonObject);
    console.log(obj);
    var vector = new THREE.Vector3(obj.X,obj.Y,obj.Z);
    return vector;
}
