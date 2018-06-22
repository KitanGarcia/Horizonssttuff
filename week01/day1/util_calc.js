window.util = {};

// Calculator Exercise
//
// Write a function calc() that takes a string that represents an arithmetic
// operation (such as "3 + 2") and returns the numerical result of the
// operation.
//
// You can assume that each number or operator (i.e. + - / *) is separated by a single
// space.
//
// Part 1. If an invalid expression is given, throw an exception.
//
// ex. util.calc('') -> Error, empty expression
// ex. util.calc('1 2') -> Error, missing operator
// ex. util.calc('-') -> Error, no numbers
// ex. util.calc('1 2 +') -> Error, operator at the wrong spot
// ex. util.calc('+ 1 -18') -> Error, operator at the wrong spot
// ex. util.calc('1 + 55 -2') -> Error, too many numbers
// ex. util.calc('29 + + 1') -> Error, too many operators
// ex. util.calc('29 + 1 +') -> Error, too many operators
//
// Part 2. Implement support for addition and subtraction.
//
// ex. util.calc('1') -> 1
// ex. util.calc('-12') -> -12
// ex. util.calc('3 + 2') -> 5
// ex. util.calc('3 + 8 + 2 + 1    ') -> 14
// ex. util.calc('2 - 1 + 5 + 6') -> 12
// ex. util.calc('-1 + 3 - 2 + 5') -> 5
//
// Part 3. Implement support for multiplication and division.
// Note that the order of operations matters. Multiplication and division needs
// to be perfomed before addition and subtraction.
//
// ex. util.calc('1 * 3 / 5 + 2') -> 2.6
// ex. util.calc('1 + 3 / 2 - 5') -> -2.5
// ex. util.calc('5 * 6 + 8 / 9 * 4.5') -> 34
// ex. util.calc('1 / 0 + 1 * 0') -> Infinity
// ex. util.calc('1 / 0 * 0 + 1') -> NaN
//
// Bonus: Implement support for the square root operator.
// Implement support for the `sqrt` operator. `sqrt` is an operator that takes
// only one argument (i.e. a unary operator). `sqrt` applied before all other
// operators
// other operators and only operates on the value after it.
// There should be a single space before and after `sqrt`.
//
// Note: you can use the builtin Math.sqrt() function.
//
// ex. util.calc('sqrt 4') -> 2, same as Math.sqrt(4)
// ex. util.calc('sqrt 4 - 3') -> -1
// ex. util.calc('-1 * sqrt 4 - 3') -> -5
// ex. util.calc('sqrt 9 - 3 * 10') -> -27
// ex. util.calc('10 * sqrt 81') -> 90
function addSub(expArr)
{
  let total = parseFloat(expArr[0]);

  for (let i = 1; i < expArr.length; i += 2)//go from operator to operator
  {
    if (expArr[i] === '+')
    {
      total = total + parseFloat(expArr[i+1]);
    }
    else if (expArr[i] === '-')
    {
      total = total - parseFloat(expArr[i+1]);
    }
  }
  return total;
}

function multdiv(expArr)
{
  for (let i = 1; i < expArr.length; i += 2)
  {
    if (expArr[i] === '*')
    {
      var product = parseFloat(expArr[i - 1]) * parseFloat(expArr[i + 1]);
      expArr.splice(i - 1, 3, product);//1 to left of mult and 2 after, replace everything between with product
      i -= 2;
    }
    else if (expArr[i] === '/')
    {
      var quotient = parseFloat(expArr[i - 1]) / parseFloat(expArr[i + 1]);
      expArr.splice(i - 1, 3, quotient);//1 to left of mult and 2 after, replace everything between with quotient
      i -= 2;
    }
  }
  return expArr;
}

function handleroots(expArr)
{
  for (let i = 0; i < expArr.length; i++)
  {
    if (expArr[i] === 'sqrt')
    {
      let root = Math.sqrt(parseFloat(expArr[i+1]));
      expArr.splice(i, 2, root);
    }
  }
  return expArr;
}

util.calc = function(expression) {
  // YOUR CODE HERE
  if (expression.length === 0)
  {
    throw "error: empty expression";
  }
  let expArr = expression.split(" ");
  let noroots = handleroots(expArr);
  let addsubonlyexp = multdiv(noroots);
  return addSub(addsubonlyexp);

};








/*
  for (let i = 0; i < expression.length; i++)
  {
    exparr.push(expression[i]);
    if (exparr[i] === '+')
    {
      isOperator[i] = true;
    }
    else if (exparr[i] === '-')
    {
      isOperator[i] = true;
    }
    else if (exparr[i] === '/')
    {
      isOperator[i] = true;
    }
    else if (exparr[i] === '*')
    {
      isOperator[i] = true;
    }
  }
  for (let i = 0; i < exparr.length; i++)
  {
    if (isOperator[i] === false)
    {
      exparr[i] = parseInt(exparr[i], 10);
    }
  }
  if ((isOperator[0] === true) || (isOperator[isOperator.length - 1] === true) || (isOperator[i - 1] && isOperator[i]) === true)
  {
    throw "error: operators at wrong spot";
  }
  
  //addition/subtraction
  for (let i = 0; i < exparr.length; i++)
  {
    if (isOperator[i] === false)
    {
      if (isOperator[i + 1] === true)
      {
      }
    }
  }*/
