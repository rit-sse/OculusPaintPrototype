function parse( jsonObject){
    console.log("Parse");
    console.log(jsonObject);
    var obj = JSON.parse(jsonObject);
    console.log(obj);
    var corr = obj.Vectors[0];
    var vector = new THREE.Vector3(corr.X,corr.Y,corr.Z);
    return vector;
}
