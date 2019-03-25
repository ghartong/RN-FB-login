import * as React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { facebookService } from '../library/FacebookService'


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="Show me more of the app" onPress={this._showMoreApp} />
                <Button title="My FB Profile" onPress={this._showProfile} />
                {facebookService.makeLogoutButton(() => { this._signOutAsync })}
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
        //this.props.navigation.navigate('Auth');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
