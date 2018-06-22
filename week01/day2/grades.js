"use strict";

window.grades = {};

// In this exercise, you will be implementing functions that will help in
// analyzing a class of students.
// You can find the data under `data/grades.js`

// Data Format:
//
// The data that will be run through each program is an array of student objects.
// The student object is comprised of these keys:
//  - 'name', a string for the student's first name (warning - not unique!)
//  - 'major', a string indicating the user's major (there are only 4 majors)
//  - 'grades', an object with two keys, 'class1' and 'class2', whose values
//     are integers from 1 to 4 indicating that students performance in the
//     class.

// [Helper] Exercise 0.A grades.average(arr<Number[]>)
// Write a function that takes an array of numbers and returns the average of all of them.
//
// ex. grades.average([0, 1, 2, 3]) -> 1.5
// ex. grades.average([1, 2, 4, 1]) -> 2
// ex. grades.average([]) -> 0
// ex. grades.average([0, 0]) -> 0
//
// hint. use _.reduce()
grades.average = function(arr) {
  // YOUR CODE HERE
  function sum(a, b)
  {
    return a + b;
  }
  let sum =  _.reduce(arr, sum);
  let avg = sum / arr.length;
  return avg;
};

// [Helper] Exercise 0.B grades.getGPA(student<Object>)
// Write a function that takes an Student object and returns its GPA
// note. remember that the student object has a .grades property, with two keys: 'class1' and 'class2'
//
// ex. grades.getGPA() -> 1.5
// ex. grades.getGPA([0, 0]) -> 0
//
// hint. use grades.average
grades.getGPA = function(student) {
  // YOUR CODE HERE
  return (student.grades.class1 + student.grades.class2) / 2;
};

// Exercise 1. grades.highestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the Student object with the highest GPA
//
grades.highestGPA = function(data) {
  // YOUR CODE HERE
}

// Exercise 2. grades.majorWithHighestGPA(data<Student[]>)
// Write a function that takes an array of Student objects and returns the major with the
// highest average GPA.
//
// Group students by major, calculate their GPAs, then find the average GPA for students
// with a given major.
//
// For example, if all the students that have the "Economics" major
// average their GPA's together and get 3.4 and all other majors' averages are less than that,
// then "Economics" would be the return value.
//
// hint. you can use highestGPA if you'd like.

function avgStudentsGPA(students)
{
  return _.reduce(students, function(memo, student)//combine students into memo
  {
    return memo + grades.getGPA(student);//add to running total called memo
  }, 0) / students.length;//0 means memo (starting running value of _.reduce)
};

grades.majorWithHighestGPA = function(data) {
  //return array of objects with student info titled by major
  let groupStudents = _.groupBy(data, function(student)
  {
    return student.major;
  });

  let gpaObj = _.mapObject(groupStudents, avgStudentsGPA);

  //take obj like {AH: 2.6, ECON: 3.2} and find largest one
  let result = _.reduce(_.keys(gpaObj), function(memo, major)
  {
    return memo.majorGPA < gpaObj[major] ? 
    {bestMajor: major, majorGPA: gpaObj[major]} : memo;//memo is highest gpa so far
  }, {bestMajor: "", majorGPA: -Infinity});//last object is memo
  return result.bestMajor;
};

// Exercise 3. grades.avgGPAPerClass(data<Student[]>)
// Write a function that takes an array of Student objects and returns an object with two keys, `class1` and `class2`, with values that correspond to the average GPA of the students taking that class.
// It should look like: { 'class1': 2, 'class2' : 2 }
//
grades.avgGPAPerClass = function(data) {
  // YOUR CODE HERE
};
