// In this exercise we will build a command line utility for
// summing numbers.
//
// sum.js should take optional command line arguments, parse the
// arguments into numbers and return their sum. Use
// **`process.argv`** to read command line arguments.
//
// ex. node sum.js 1 2
// > 3
// ex. node sum.js 2 3 4 5
// > 14
// ex. node sum.js 2 -5 3
// > 0
//
// If no command line arguments are specified, you should ask the
// user for 2 numbers and print their sum.
//
// ex. node sum.js
// > Enter first number?
// > 1
// > Enter second number?
// > 4
// > 5
//

// Example code for reading command line arguments:
var readline = require('readline');//this is like a C/C++ include



console.log('Command line arguments', process.argv.slice(2));
//slicing the argv by 2 removes "node" and "sum.js" from the arguments


sumArr = process.argv.slice(2);

var sum = 0;

if (sumArr.length !== 0)
{
  for (var i = 0; i < sumArr.length; i++)
  {
    sum = sum + parseInt(sumArr[i]);
  }
  console.log("Sum = ", sum);
}


// Example code for getting input from the user




if (sumArr.length == 0)
{
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter your first number: ", function(number1) {
    var num1 = parseInt(number1);
    rl.question("Enter your second number: ", function(number2) {
      var num2 = parseInt(number2);//does this work
      sum = num1 + num2;
      console.log(num1 + num2);
      rl.close();
    });

  });
}
