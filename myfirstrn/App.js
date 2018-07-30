import React from 'react';
import { TouchableOpacity,  StyleSheet, Text, View } from 'react-native';
//var _ = require("underscore");

/*
//RED BOX THAT DISAPPEARS
export default class App extends React.Component {
  constructor()
  {
    super();
    this.state = {isDisplayed: "flex"};
  }

  white()
  {
    this.setState({isDisplayed: "none"});
  }

  render() {
    return (
        <TouchableOpacity onPress={this.white.bind(this)}>
        <View style={{width: 150, height: 150, backgroundColor: "red", display: this.state.isDisplayed}}>
        </View>
        </TouchableOpacity>
    );
  }
}
*/

/*
INCREMENT/DECREMENT COUNT
export default class App extends React.Component {
  constructor()
  {
    super();
    this.state = {count: 0};
  }

  inc()
  {
    this.setState({count: this.state.count + 1});
  }

  dec()
  {
    this.setState({count: this.state.count - 1});
  }

  render() {
    return (
     <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "green"}}>
        <Text>Count: {this.state.count}</Text>
        <TouchableOpacity onPress={this.inc.bind(this)}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.dec.bind(this)}>
          <Text>-</Text>
        </TouchableOpacity>
     </View>
    );
  }
}*/





/*
INCREMENT/DECREMENT COUNT
export default class App extends React.Component {
  constructor()
  {
    super();
    this.state = {count: 0};
  }

  inc()
  {
    this.setState({count: this.state.count + 1});
  }

  dec()
  {
    this.setState({count: this.state.count - 1});
  }

  render() {
    return (
     <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "green"}}>
        <Text>Count: {this.state.count}</Text>
        <TouchableOpacity onPress={this.inc.bind(this)}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.dec.bind(this)}>
          <Text>-</Text>
        </TouchableOpacity>
     </View>
    );
  }
}*/


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
