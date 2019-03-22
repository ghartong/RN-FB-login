import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, AsyncStorage } from 'react-native'
import { facebookService } from '../../library/FacebookService'
import { Avatar } from 'react-native-elements'

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: null
        }
    }

    componentDidMount() {
        console.log('<<<<<<<< Mounting')
        this.loadData()
    }

    async loadData() {
        console.log('<<<<<<<< Loading Data')
        if (!this.state.profile) {
            console.log('<<<<<<<< No profile found so go get it')

            const profile = await facebookService.fetchProfile()

            this.setState({
                profile: profile
            })    
        }
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                backgroundColor: '#F5FCFF',
                padding: 10
            },
            point: {
                paddingTop: 30
            }
        })

        const profile = this.state.profile
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <ProfileView profile={profile} logout={this.logout}/>
                </View>
            </SafeAreaView>
        )
    }

    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

}

class ProfileView extends Component {

    render() {
        const profile = this.props.profile
        if (profile == null) {
            return <View />
        }

        const styles = StyleSheet.create({
            container: {
                flexDirection: 'row'
            },
            left: {
                paddingRight: 10
            },
            text: {
                fontSize: 20
            },
            right: {
                flexDirection: 'column',
                justifyContent: 'space-around'
            }
        })

        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <Avatar
                        size='large'
                        large
                        rounded
                        source={{ uri: profile.avatar }} />
                </View>
                <View style={styles.right}>
                    <Text style={styles.text}>{profile.name}</Text>
                    {facebookService.makeLogoutButton(() => {
                        this.props.logout()
                    })}
                </View>
            </View>
        )
    }
}
