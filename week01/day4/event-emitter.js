// In this exercise you will create your own EventEmitter class
// that will listen for & emit events.
//
// Think of EventEmitter as a subscription service.
// Listeners subscribe to events using .on() and .once().
// And publishers publish events using .emit().
// When an event is emitted, everyone who has subscribed to the event is
// notified by calling the callback functions they have provided.
//
// The EventEmitter should contain an object called "listeners"
// (under this.listeners). This object maps event types to arrays.
// Each array contains functions that should be called when an event
// of that type is sent via this.emit().

// !HINT! We recommend implementing the EventEmitter constructor, .on() and
// .emit() together !HINT!
//
// Once you correctly implement the EventEmitter object you
// will be able to use the messenger application. Note that if you
// send a message on one device, it will be available on all
// other devices.
//
// You need to give EventEmitter a property called listeners. it will
// be an object where the keys are names for the event, and values
// are arrays containing listener functions ("fn"). These functions will
// run when their corresponding event ("eventName") is emitted.
//
//
// Example.
// var emitter = new EventEmitter();
//
// function f1() {}
// function f2() {}
//
// emitter.on('someEventName', f1);
// emitter.on('someEventName', f2);
// emitter.on('otherEventName', f2);
// emitter.listeners // -> {someEventName: [f1,f2], otherEventName: [f2]}
function EventEmitter() {
  // YOUR CODE HERE
  this.listeners = {};//keys are names of events; values are arrays containing listener functions
  
}

// Takes is a string "eventName" and a callback function "fn"
// add a listener to the listeners property in EventEmitter
// Adds the listener function to the end of the listeners
// array (in the listeners property) for the event named eventName.
//
// Example.
// var emitter = new EventEmitter();
// function log() { console.log('called'); }
// emitter.on('someEvent', log);
// emitter.listeners // -> {someEvent: [log]}
// emitter.emit('someEvent') // -> prints 'called'
// emitter.emit('someEvent') // -> prints 'called'
// emitter.emit('someEvent') // -> prints 'called'
EventEmitter.prototype.on = function(eventName, fn) {
  // YOUR CODE HERE
  if (!this.listeners[eventName])
  {
    this.listeners[eventName] = [];//add object with eventName key and fn value to listeners array
  }
  this.listeners[eventName].push(fn);
  
}

// Takes is a string "eventName" and a single argument arg
// It calls each of the listeners registered for the event
// named eventName, in the order they were registered, passing
// the supplied arguments to each.
//
// Example.
// var emitter = new EventEmitter();
// function log(arg) {
//  console.log('called', arg);
// }
// emitter.on('someEvent', log);
// emitter.emit('someEvent', 1) // -> prints 'called 1'
// emitter.emit('someEvent', 2) // -> prints 'called 2'
// emitter.emit('someEvent', 'x') // -> prints 'called x'
EventEmitter.prototype.emit = function(eventName, arg) {
  for (var i = 0; i < this.listeners[eventName].length; i++)//length of array of functions
  {
    this.listeners[eventName][i].call(null, arg);
  }
}

// Takes is a string "eventName" and a callback function "fn"
// Removes the specified listener from the listener array
// for the event named eventName.
//
// Example.
// var emitter = new EventEmitter();
// function log(arg) {
//  console.log('called', arg);
// }
// emitter.on('someEvent', log);
// emitter.emit('someEvent', 1) // -> prints 'called 1'
// emitter.removeListener('someEvent', log)
// emitter.emit('someEvent', 1) // -> prints nothing
EventEmitter.prototype.removeListener = function(eventName, fn) {
  // YOUR CODE HERE
//SHOULD IT BE THIS?
  this.listeners[eventName].shift();
/*  for (var i = 0; i < this.listener[eventName].length; i++)//should be length of listener array
  {
    if (listener[eventName])
    {
      this.listener[eventName].splice(i, 1);//attempt to remove the element of the array (2nd parameter is element to remove)
      i--;
    }//is it i or should it be i + 1??
  }*/
  //return emitter.listener.splice?
}

// *Bonus*: Takes is a string "eventName" and a callback function "fn"
// Adds a one time listener function for the event named
// eventName. The next time eventName is triggered, this
// listener is removed and then called.
//
// Example.
// var emitter = new EventEmitter();
// function log() { console.log('called'); }
// emitter.once('someEvent', log);
// emitter.emit('someEvent') // -> prints 'called'
// emitter.emit('someEvent') // -> prints nothing
// emitter.emit('someEvent') // -> prints nothing
EventEmitter.prototype.once = function(eventName, fn) {
  // YOUR CODE HERE
}
