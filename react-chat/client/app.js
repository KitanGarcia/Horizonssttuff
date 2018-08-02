import React from 'react';



class ChatRoom extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      socket: this.props.socket,
      roomName: this.props.roomName,
      username: this.props.username,
      message: "",
      messages: []
    }
  }

  componentDidMount()
  {
    var messageArray = this.state.messages.slice();
    this.state.socket.on('message', function(message)//should it be .on?
    {
      messageArray.push(message);
      this.setState({messages: messageArray});
    });
  }

  componentWillReceiveProps(nextProps)
  {
    if (this.props.roomName !== nextProps.roomName)
    {
      this.setState({message: "", messages: []});
      this.setState({roomName: nextProps.roomName});//this is good right?
    }
  }

  handleChange(event)
  {
    this.setState({message: event.target.value});
  }

  handleSubmit(event)
  {
    event.preventDefault;
    let {message, messages} = this.state;
    let {username} = this.props;//check these
    var messageArray = this.state.messages.slice();
    messageArray.push(this.state.username + ": " + message);//add new message onto array with username in front
    this.setState({messages: messageArray});
    
    this.setState({message: ""});//SHOULD ALSO EMIT MESSAGE EVENT? AND PUSH NEW MESSAGE TO THIS.STATE.MESSAGES?
    this.props.socket.emit("message", message);
  }

  render()
  {
    console.log("Rendering chatroom");
    return (
      <div>
        <ul>{this.state.messages.map((message) => <li>{message}</li>)}</ul>

          <p>input: {this.state.message}</p>
          <input type = "text" value = {this.state.message}  onChange={(event) => this.handleChange(event)}/>
          <button onClick={(event) => this.handleSubmit(event)}>Submit</button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(),
      roomName: null,//default name of a room
      username: ""
    };
  }


  componentWillUnmount() {
    console.log("will unmount");
  }

  componentDidMount() {
    // WebSockets Receiving Event Handlers
    this.state.socket.on('connect', () => {
      console.log('connected');
      var username = prompt("Username: ");
      this.state.socket.emit("username", username);
      this.setState({username: username});
    });

    this.state.socket.on('errorMessage', message => {
        alert("Error: " + message);//does this work
    });
  }

  join(room) {
    console.log(room);
    this.setState({roomName: room});
    this.state.socket.emit("room", room);
  }

  render() {
    return (
      <div>
        <h1>React Chat</h1>
        <h2>{this.state.roomName} - {this.state.username}</h2>
        <button className="btn btn-default" onClick={() => this.join("Party Place")}>
          Join the Party Place
        </button>
        {this.state.roomName ?   <ChatRoom socket = {this.state.socket} room = {this.state.roomName} username = {this.state.username}/> : null}
      </div>
    );
  }
}


//LESSONS: USE ARROW FUNCTIONS INSTEAD OF BIND, ALWAYS RETURN (, FORMS ARE RETARDED:

export default App;
