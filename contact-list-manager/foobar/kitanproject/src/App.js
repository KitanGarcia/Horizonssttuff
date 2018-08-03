import React, { Component } from 'react';
import logo from './logo.svg';
import "isomorphic-fetch";
import './App.css';

class App extends Component {
  constructor(props)
  {
    super(props);
      this.state =
      {
        name: "",
        phone: "",
        birthday: new Date(0),//an empty date?
        contacts: []
      }
  }
  
  handleName(event)
  {
    this.setState({name: event.target.value});
    console.log("Name: "+ this.state.name);
  }

  handlePhone(event)
  {
    this.setState({phone: event.target.value});
    console.log("Phone: "+ this.state.phone);
  }

  handleBirthday(event)
  {
    this.setState({birthday: event.target.value});
    console.log("Birthday: "+ this.state.birthday);
  }

  handleCreate(event)
  {
    let contact = 
    {
      "name": this.state.name,
      "phone": this.state.phone,
      "birthday": this.state.birthday
    }
    console.log("Contact: " + contact);
    let newContacts = this.state.contacts.slice();
    newContacts.push(contact);
    console.log(newContacts);
    this.setState({contacts: newContacts});
    console.log("Contacts: ");
    console.log(this.state.contacts);


    let name = this.state.name;//these are to prevent an error below in stringify
    let phone = this.state.phone;
    let birthday = this.state.birthday;
    fetch('/contact/create', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        birthday
      })
    }).then((initres) => 
    
    {
      console.log(initres);
      return initres.json();
    })
    .then((data)=> {
      if(data.status === 200) {
        // worked
      } else {
        // error
      }
    }).catch((err) => {
      // network error
    })


  }

  handleClear(event)
  {
    this.setState({name: ""});
    this.setState({phone: ""});
    this.setState({birthday: ""});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Kitan's Kontacts</h1>
          <h2>Add a Contact</h2>
        </header>
          <input type = "text" name = "name" placeholder = "Name" value = {this.state.name}  onChange={(event) => this.handleName(event)}/>
          <input type = "text" name = "phone" placeholder = "Phone" value = {this.state.phone}  onChange={(event) => this.handlePhone(event)}/>
          <input type = "date" name = "birthday" placeholder = "Birthday" value = {this.state.birthday} onChange={(event) => this.handleBirthday(event)}/>
          <button onClick = {(event) => this.handleCreate(event)}>Add Contact</button>
          <button onClick = {(event) => this.handleClear(event)}>Clear</button>
          {this.state.contacts.length > 0 ?  <ul>{this.state.contacts.map((contact) => <li key = {Math.random()}>Name: {contact.name} Phone: {contact.phone} Birthday: {contact.birthday}</li>)}</ul> : null}
      </div>
    );
  }
}




export default App;
