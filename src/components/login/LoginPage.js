import React from 'react'
import { StyleSheet, View } from 'react-native'
import { facebookService } from '../../library/FacebookService'

export default class LogInPage extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
      };
    
    render() {
        return (
            <View style={styles.container}>
                {facebookService.makeLoginButton((accessToken) => {
                    this._signInAsync(accessToken)
                })}
            </View>
        )
    }

    _signInAsync = async (accessToken) => {
        this.props.navigation.navigate('App');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
})
