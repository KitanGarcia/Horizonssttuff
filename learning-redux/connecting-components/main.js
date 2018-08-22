const { createStore } = Redux;
// const createStore = Redux.createStore;
const reducer = (state = true, action) => {
  switch(action.type) {
    case 'TOGGLE':
      return !state;
    default:
      return state;
  }
}
// store needs a reducer so it can set the initial state and so
// logic can be applied for each action
const store = createStore(reducer);

const { Provider, connect } = ReactRedux;

const toggle = () => {
  return {
    type: 'TOGGLE'
  };
}

const mapStateToProps = (state) => {
  return {
    value: state ? 'red' : 'blue'
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => dispatch(toggle())
  };
}

var ColorToggle = ({value, handleClick}) => {
  return (
    <div className={value} onClick={handleClick}> </div>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <ColorToggle />
    </Provider>
  )
}

ColorToggle = connect(mapStateToProps,mapDispatchToProps)(ColorToggle)

ReactDOM.render(<App />, document.getElementById('root'));

