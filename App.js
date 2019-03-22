import * as React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStore, combineReducers } from 'redux'
import LoginPage from './src/components/login/LoginPage'
import AuthLoadingScreen from './src/components/login/AuthLoadingScreen'
import ProfilePage from './src/components/profile/ProfilePage'
import { facebookService } from './src/library/FacebookService'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="My FB Profile" onPress={this._showProfile} />
        {facebookService.makeLogoutButton(() => {  this._signOutAsync  })}
      </View>
    );
  }

  _showProfile = () => {
    this.props.navigation.navigate('Profile');
  };

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen, Profile: ProfilePage });
const AuthStack = createStackNavigator({ SignIn: LoginPage });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
