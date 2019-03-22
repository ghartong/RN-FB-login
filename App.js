import * as React from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import LoginPage from './src/components/login/LoginPage'
import HomeScreen from './src/components/HomeScreen'
import OtherScreen from './src/components/OtherScreen'
import AuthLoadingScreen from './src/components/login/AuthLoadingScreen'
import ProfilePage from './src/components/profile/ProfilePage'
import store from './src/store'
import Counter from './src/components/counter'
import StaticCounter from './src/components/counter/StaticCounter'


const AppStack = createStackNavigator(
  {
    Counter: Counter,
    StaticCounter: StaticCounter,
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
