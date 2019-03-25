import * as React from 'react'
import { StyleSheet, View, ActivityIndicator, StatusBar, Text } from 'react-native'
import { connect } from 'react-redux'
import {actions as userActions} from '../../reducers/userReducer'
import FBSDK from 'react-native-fbsdk'
const { AccessToken } = FBSDK


class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super();
        this._checkForLogin(props);
    }

    _checkForLogin = (props) => {
        // check for state logged In
        if (props.isLoggedIn) {
            props.navigation.navigate('App')
        }

        // check for FB login
        AccessToken.getCurrentAccessToken()
            .then((data) => {
                if (data && data.accessToken) {
                    props.setLoggedIn(true)
                    props.navigation.navigate('App')
                }
            })
            .catch(error => {
                console.log(error)
            })

        props.navigation.navigate('Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <Text>Logged in: {this.props.isLoggedIn.toString()}</Text>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

// Connect the screens to Redux
const getAuthLoadingScreenState = state => {
    return {
        isLoggedIn: state.user.loggedIn
    }
}
export default connect(getAuthLoadingScreenState,  Object.assign({}, userActions))(AuthLoadingScreen);
