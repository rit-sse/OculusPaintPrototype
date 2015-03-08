/**
 * Created by Matthew on 3/1/2015.
 */
var fs = require('fs');
var fileName = "dl1.txt";

exports.writeToLog = function(message) {
    fs.appendFile("drawingLog/dl1.txt", message + "\n", function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
};

exports.readLog = function(callback){
    fs.readFile("drawingLog/dl1.txt","utf8",function(err,data){
        if (err) throw err;
        console.log(data);
    });
}