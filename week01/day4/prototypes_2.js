"use strict";

window.prototypes = {};

// Part 2. Adding methods to collections

// You are going to implement a function that compares if two arrays have the same
// things, without necessarily having the same order.

// [3, 2, 1].hasEqualContent([1, 2, 3]) -> true
// [1, 2, 3].hasEqualContent([1, 2, 3]) -> true
// [].hasEqualContent([]) -> true
// [1, 3, 4].hasEqualContent([1, 3, 4, 5]) -> false
// [1, 2, 4].hasEqualContent([1, 3, 4]) -> false

// Hint: the first thing you have to figure out is how to get the first array
// inside the function. Then you can compare it to array2.

Array.prototype.hasEqualContent = function(array2){
 // YOUR CODE HERE
 if (array2.length != this.length)
 {
   return false;
 }
 var sorted2 = array2.sort();
 var sorted1 = this.sort();
 for (var i = 0; i < array2.length; i++)
 {
   if (sorted2[i] != sorted1[i])
   {
     return false;
   }
 }
 return true;
}

// You are going to implement a function that compares if two Objects have the same
// key-value pairs.

// {a:1, b:2, c:3}.hasEqualContent({a:1, b:2, c:3}) -> true
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3, b:2}) -> true
// {}.hasEqualContent({}) -> true
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3}) -> false
// {a:3, b:1, c:2}.hasEqualContent({a:1, b:2, c:3}) -> false

// Hint: use the Array.prototype.hasEqualContent to compare the content of an object,
// without having to account for the order of elements.

Object.prototype.hasEqualContent = function(object2){
 var obj2KeyArr = Object.keys(object2);
 var obj1KeyArr = Object.keys(this);
 var obj2ValArr = Object.values(object2);
 var obj1ValArr = Object.values(this);
 console.log(obj1ValArr, obj2ValArr);
 console.log(obj1KeyArr.hasEqualContent(obj2KeyArr));

 if (obj2KeyArr.length != obj1KeyArr.length)
 {
   return false;
 }

 for (var i = 0; i < obj2KeyArr.length; i++)
 {
   if (this[obj1KeyArr[i]] !== object2[obj1KeyArr[i]])
   {
     return false;
   }
   return true;
 }

/*
 if (obj2ValArr.hasEqualContent(obj1ValArr) && obj1KeyArr.hasEqualContent(obj2KeyArr))
 {
   return true;
 }
 return false;*/

}
