//var net = require('net');
var lastNode = null;
var client = net.connect({port: 8125},
    function() { //'connect' listener
        console.log('client connected');
        //var obj = { size : 20, name: "Jason" };
        //var json = JSON.stringify(obj);
        //client.write(json);
    });
client.on('data', function(data) {
    console.log("Here");
    console.log(data);
    if (lastNode == null){
        lastNode = parse(data);
    }else{
        var newNode = parse(data);
        draw.drawLine(lastNode,newNode);
        lastNode = newNode;
    }
});
client.on('end', function() {
    console.log('client disconnected');
});

function parse( jsonObject){
    console.log("Parse");
    console.log(jsonObject);
    var obj = JSON.parse(jsonObject);
    console.log(obj);
    var corr = obj.Vectors[0];
    var vector = new THREE.Vector3(corr.X,corr.Y,corr.Z);
    return vector;
};