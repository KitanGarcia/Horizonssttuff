const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const increment = () => ({
    type: 'INCREMENT'
});

const decrement = () => ({
    type: 'DECREMENT'
});


class Counter extends React.Component {
  render() {
    return (
      <div>
      <h1>{store.getState()}</h1>
     {/* dispatch correct actions in the onClicks */ }
      <button onClick={() => store.dispatch(increment())}
       >+</button>
      <button onClick={() => store.dispatch(decrement())}
       >-</button>
    </div>
   );  
  }
};


import {createStore} from 'redux';
const store = createStore(counter);

const render = () => {
  ReactDOM.render(
    <Counter />,
    document.getElementById('root')
  );
  console.log(store.getState());
};

store.subscribe(render);
render();

