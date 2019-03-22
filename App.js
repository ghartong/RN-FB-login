import * as React from 'react'
import { Provider, connect } from 'react-redux'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStore, combineReducers } from 'redux'
import LoginPage from './src/components/login/LoginPage'
import HomeScreen from './src/components/HomeScreen'
import OtherScreen from './src/components/OtherScreen'
import AuthLoadingScreen from './src/components/login/AuthLoadingScreen'
import ProfilePage from './src/components/profile/ProfilePage'

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
