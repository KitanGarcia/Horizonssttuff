describe("EventEmitter", function() {
  var fun1;
  var fun2;
  var fun3;
  var eventEmitter;

  beforeEach(function() {
    fun1 = jasmine.createSpy('fun1');
    fun2 = jasmine.createSpy('fun2');
    fun3 = jasmine.createSpy('fun3');
    eventEmitter = new EventEmitter();
  });

  it("on(eventName, fn) should add new function to listeners", function() {
    eventEmitter.on('testFn10', fun1);
    eventEmitter.on('testFn100', fun2);
    expect(eventEmitter.listeners['testFn10']).toEqual([jasmine.any(Function)]);
    expect(eventEmitter.listeners['testFn100']).toEqual([jasmine.any(Function)]);
  });

  it("emit(eventName, arg) should call all functions added with on()", function() {
    // Add 2 listeners to one eventName
    eventEmitter.on('testFn10', fun1);
    eventEmitter.on('testFn10', fun2);
    // Add 1 listener to another eventName
    eventEmitter.on('testFn100', fun3);

    // Emit event and ensure both listeners have been called
    eventEmitter.emit('testFn10', 10);
    expect(fun1).toHaveBeenCalledWith(10);
    expect(fun2).toHaveBeenCalledWith(10);

    // Emit multiple events and ensure listener is called multiple times
    eventEmitter.emit('testFn100', 100);
    eventEmitter.emit('testFn100', 100);
    eventEmitter.emit('testFn100', 100);
    expect(fun3).toHaveBeenCalledWith(100);
    expect(fun3.calls.count()).toBe(3);
  });

  it("removeListener(eventName, fn) should remove function from listeners", function() {
    eventEmitter.on('testFn10', fun1);
    expect(eventEmitter.listeners['testFn10']).toEqual([jasmine.any(Function)]);
    eventEmitter.removeListener('testFn10', fun1)
    expect(eventEmitter.listeners['testFn10']).toEqual([]);
  });

  it("once(eventName, fn) should store function in listeners", function() {
    eventEmitter.once('connection', fun1);
    expect(eventEmitter.listeners['connection']).toEqual([jasmine.any(Function)]);
  });

  it("once(eventName, fn) should remove function after first call", function() {
    // Add event listener with once
    eventEmitter.once('connection', fun1);
    // Emit 3 events
    eventEmitter.emit('connection', 1);
    eventEmitter.emit('connection', 2);
    eventEmitter.emit('connection', 3);
    // Ensure that the callback functon is only called once
    expect(fun1).toHaveBeenCalledWith(1);
    expect(fun1.calls.count()).toBe(1);
    expect(eventEmitter.listeners['connection']).toEqual([])
  });
});
