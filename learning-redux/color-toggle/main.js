import { createStore } from 'redux';

// a pure function: prevstate + action -> newstate
const reducer = (state = false, action) => {
  if (action.type === 'TOGGLE') {
    return !state;
  } else {
    return state;
  }
}

// store needs a reducer that it will use to manage state changes (initiated by dispatched actions)
const store = createStore(reducer);

// A functional react component
let ColorToggle = () =>  (
  <div
    className={store.getState() ? 'red' : 'blue'}    // component reads from the state
    onClick={() => store.dispatch({type: "TOGGLE"})} // dispatching a 'TOGGLE' action (how component initiates state changes)
  >
  </div>
);

// Our usual ReactDom.render, I just put it in a function for convenience
function render() {
  ReactDOM.render(<ColorToggle />, document.getElementById('root'));
}

store.subscribe(render);
render();
