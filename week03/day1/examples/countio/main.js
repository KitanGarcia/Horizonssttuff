// Modify anything you like. Remember the content of the program is not important.
// This is just an example to help you practice reading and writing from and to files.
var fs = require("fs");
var fileArr = fs.readFileSync("./log.txt", "utf8");
console.log(fileArr);

//using utf 8 encoding makes each thing written a string
var newFileArr = fs.writeFileSync("./log.txt", fileArr + "\n" + new Date()+ "\n", {encoding: "utf8"});


var newString = fileArr + "\n" + new Date();//string of everything with the new date added on

var splitArray = newString.split("\n");//get the string of everything and turn it into an array split by newlines

if(process.argv[2] === '-s' || process.argv[2] === '--stats' ) {
    console.log("stats requested");

  console.log("Times run: ", Math.ceil((splitArray.length - 1) / 2));
  console.log("First time run: ", splitArray[1]);
  console.log("Last time run: ", splitArray[splitArray.length - 1]);

} else {
    console.log("ran at:" + new Date());
}
    
