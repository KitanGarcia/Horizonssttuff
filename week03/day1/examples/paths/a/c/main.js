// Modify only this file

// The code below runs the functions exported by five.js
// five.js sits in the same directory so './five.js' is 
// my relative path from main.js (current file)

// var five = require('./five.js')
// five.logger(five.value);

// YOUR CODE HERE

var one = require("/mnt/Windows8_OS/Horizons/week03/day1/examples/paths/b/one.js");
one.first();
one.second();

var two = require("/mnt/Windows8_OS/Horizons/week03/day1/examples/paths/a/two.js");
two.twoFunc();

var three = require("/mnt/Windows8_OS/Horizons/week03/day1/examples/paths/b/three.js");

var four = require("./four.js");
three.logger(four.horizons);

/*var five = require('./five.js')
five.logger(five.value);*/


// Output should look like
//     *
//    *
//   *
//  *
