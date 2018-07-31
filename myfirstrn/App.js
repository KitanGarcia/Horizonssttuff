import React from 'react';
import {AppRegistry, ListView, TouchableOpacity,  StyleSheet, Text, View } from 'react-native';
var _ = require("underscore");
import {createStackNavigator} from 'react-navigation';

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
SCROLLABLE LIST OF 100 NUMBERS
export default class App extends React.Component {
  constructor()
  {
    super();
    var dataSource = new ListView.DataSource(
    {
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });
    this.state = {dataSource: dataSource.cloneWithRows(_.range(100))};
  }

  render() {
    return (
     <View style={{marginTop: 20, flex: 1}}>
       <ListView
         renderRow={(item) => (
           <View style={{alignItems: "center"}}><Text>{item}</Text></View>
         )}
         dataSource={this.state.dataSource}
       />
     </View>
    );
  }
}*/

/*
//NUMBER 1-100, CLICK TO REMOVE
export default class App extends React.Component {
  constructor()
  {
    super();
    this.state = {numbers: _.range(100)};
  }

  remove(item)
  {
    this.setState({numbers: this.state.numbers.filter((curItem) => (item !== curItem))});
  }

  render() {
    var dataSource = new ListView.DataSource(
    {
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });
    return (
     <View style={{marginTop: 20, flex: 1}}>
       <ListView
         renderRow={(item) => (
           <View style={{alignItems: "center"}}>
             <TouchableOpacity onPress={this.remove.bind(this, item)}>
               <Text>{item}</Text>
             </TouchableOpacity>
           </View>
         )}
         dataSource={dataSource.cloneWithRows(this.state.numbers)}//creates dataSource object from an array
       />
     </View>
    );
  }
}
*/


/*
export default class App extends React.Component {
  constructor()
  {
    super();
    this.state = {numbers: _.range(10)};
  }

  remove(item)
  {
    this.setState({numbers: this.state.numbers.filter((curItem) => (item !== curItem))});
  }

  render() {
    var dataSource = new ListView.DataSource(
    {
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });
    return (
     <View style={{marginTop: 20, flex: 1}}>
       <ListView
         renderRow={(item) => (
           <View style={{alignItems: "center"}}>//touchableopac...
               <Text>{item}</Text>
           </View>
         )}
         dataSource={dataSource.cloneWithRows(this.state.numbers)}//creates dataSource object from an array
       />
     </View>
    );
  }
}*/


class App extends React.Component {
  static navigationOptions = (props) => (
  {
    title: "Home Page",
    headerRight: <TouchableOpacity onPress = {() => (props.navigation.navigate("Page2"))}><Text>Second Page</Text></TouchableOpacity>
  });
  render() {
    return (
     <View style={{flex: 1, backgroundColor: "red", alignItems: "center", justifyContent: "center"}}>
           <Text>This is Page One</Text>
           <TouchableOpacity onPress = {() => this.props.navigation.navigate("Page2")}>
               <Text>Click here to go to Page Two!</Text>
           </TouchableOpacity>
     </View>
    );
  }
}

class Second extends React.Component
{
  static navigationOptions = (props_ => (
  {
    title: "Second Page"
  }));
  render()
  {
    return(
    <View style={{
        backgroundColor: "blue",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }}>
      <Text>Welcome to Page Two!</Text>
    </View>);

  }
}

const Navigator = createStackNavigator(
		{
Home: {screen: App},
  Page2: {screen: Second}
});

export default Navigator;
