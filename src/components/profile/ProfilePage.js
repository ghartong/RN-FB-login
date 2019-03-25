import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { facebookService } from '../../library/FacebookService'
import { Avatar } from 'react-native-elements'
import { connect } from 'react-redux'

class ProfilePage extends React.Component {
    componentDidMount() {
        this.loadData()
    }

    async loadData() {
        if (!this.props.fbProfile.id) {
            await facebookService.fetchProfile()
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

        const profile = this.props.fbProfile

        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <ProfileView profile={profile} logout={this.logout}/>
                </View>
            </SafeAreaView>
        )
    }

    logout = async () => {
        //this.props.navigation.navigate('Auth');
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

// Connect the screens to Redux
const getProfileState = state => {
    return {
      fbProfile: state.user.fb
    }
  }
export default connect(getProfileState)(ProfilePage);
