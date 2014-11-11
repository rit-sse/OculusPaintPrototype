var net = require('net');
var client = net.connect({port: 8124},
    function() { //'connect' listener
        console.log('client connected');
        var obj = { size : 20, name: "Jason" };
        var json = JSON.stringify(obj);
        client.write(json);
    });
client.on('data', function(data) {
    console.log(data.toString());
    client.end();
});
client.on('end', function() {
    console.log('client disconnected');
});