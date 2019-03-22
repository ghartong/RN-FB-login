import * as React from 'react'
import { Provider, connect } from 'react-redux'
import { View, Text, Button, StyleSheet } from 'react-native'

import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStore, combineReducers } from 'redux'
import LoginPage from './src/components/login/LoginPage'
import HomeScreen from './src/components/HomeScreen'
import OtherScreen from './src/components/OtherScreen'
import AuthLoadingScreen from './src/components/login/AuthLoadingScreen'
import ProfilePage from './src/components/profile/ProfilePage'

// A very simple reducer
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// A very simple store
let store = createStore(combineReducers({ count: counter }));

// A screen!
class Counter extends React.Component {
  static navigationOptions = {
    title: 'Counter!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{this.props.count}</Text>
        <Button
          title="Increment"
          onPress={() => this.props.dispatch({ type: 'INCREMENT' })}
        />
        <Button
          title="Decrement"
          onPress={() => this.props.dispatch({ type: 'DECREMENT' })}
        />

        <Button
          title="Go to static count screen"
          onPress={() => this.props.navigation.navigate('StaticCounter')}
        />
      </View>
    );
  }
}

// Another screen!
class StaticCounter extends React.Component {
  static navigationOptions = {
    title: `Same number, wow!`,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{this.props.count}</Text>
      </View>
    );
  }
}

// Connect the screens to Redux
let CounterContainer = connect(state => ({ count: state.count }))(Counter);
let StaticCounterContainer = connect(state => ({ count: state.count }))(
  StaticCounter
);

const AppStack = createStackNavigator(
  {
    Counter: CounterContainer,
    StaticCounter: StaticCounterContainer,
    Home: HomeScreen,
    Other: OtherScreen,
    Profile: ProfilePage
  },
  {
    initialRouteName: 'Home'
  }
)
const AuthStack = createStackNavigator(
  { SignIn: LoginPage }
)
let RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

let Navigation = createAppContainer(RootStack)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
});
