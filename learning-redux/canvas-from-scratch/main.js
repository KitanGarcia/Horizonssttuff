const { createStore } = Redux;


const pickColor = (color) => ({ type: 'PICK_COLOR', color: color });
const paintCanvas = () => ({ type: 'PAINT_CANVAS'});

const initialState = { canvasColor: 'red', bucketColor: 'red'};
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'PICK_COLOR':
      return Object.assign({}, state, {bucketColor: action.color});
    case 'PAINT_CANVAS':
      return Object.assign({}, state, {canvasColor: state.bucketColor});
    default:
      return state;
  }
}

const store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <div>
          <Canvas />
          <ColorPicker choices={['red', 'green', 'blue', 'yellow']} />
      </div>
   );  
  }
};

class Canvas extends React.Component {
  render() {
    const styleObj = {
      border: '2px solid black',
      width: '100px',
      height: '100px',
      backgroundColor: store.getState().canvasColor
    };
    return (
      <div style={styleObj} onClick={() => store.dispatch(paintCanvas())}></div>
    )
  }
}

class ColorPicker extends React.Component {
  render() {
    return (
      <div>
        { this.props.choices.map((choice) => (<ColorButton choice={choice}/>))}
      </div>
    )
  }
};
      
class ColorButton extends React.Component {
  render() {
    const styleObj = {
      border: '2px solid black',
      width: '20px',
      height: '20px',
      backgroundColor: this.props.choice,
      margin: '10px',
      display: 'inline-block'
    };
    return (
      <div style={styleObj} onClick={() => store.dispatch(pickColor(this.props.choice))}></div>
    )
  }
}


function render() {
  ReactDOM.render(<App/>, document.getElementById('root'));
}

store.subscribe(render);
render();
