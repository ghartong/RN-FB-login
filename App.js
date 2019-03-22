import * as React from 'react'
import { AsyncStorage, Button, StatusBar, StyleSheet, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStore, combineReducers } from 'redux'
import LoginPage from './src/components/login/LoginPage'
import HomeScreen from './src/components/HomeScreen'
import AuthLoadingScreen from './src/components/login/AuthLoadingScreen'
import ProfilePage from './src/components/profile/ProfilePage'

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
