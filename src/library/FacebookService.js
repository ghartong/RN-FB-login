import React from 'react'
import FBSDK from 'react-native-fbsdk'
import store from '../store'

const { LoginButton, AccessToken, GraphRequest, GraphRequestManager } = FBSDK

class FacebookService {
    constructor() {
        this.requestManager = new GraphRequestManager()
    }

    makeLoginButton(callback) {
        return (
            <LoginButton
                readPermissions={["public_profile"]}
                onLoginFinished={(error, result) => {
                    if (error) {

                    } else if (result.isCancelled) {

                    } else {
                        AccessToken.getCurrentAccessToken()
                            .then((data) => {
                                store.dispatch({type: 'SET_LOGGED_IN', msg: true})

                                callback(data.accessToken)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                }} />
        )
    }

    makeLogoutButton(callback) {
        return (
            <LoginButton onLogoutFinished={() => {
                store.dispatch({type: 'SET_LOGGED_IN', msg: false})
                props.navigation.navigate('Auth');
            }} />
        )
    }

    async fetchProfile(callback) {
        return new Promise((resolve, reject) => {
            const request = new GraphRequest(
                '/me',
                null,
                (error, result) => {
                    if (result) {
                        let profile = result
                        profile.avatar = `https://graph.facebook.com/${result.id}/picture`

                        store.dispatch({
                            type: 'SET_USER_FB',
                            fb: {...profile}
                        })
                        resolve(profile)
                    } else {
                        reject(error)
                    }
                }
            )

            this.requestManager.addRequest(request).start()
        })
    }

}

export const facebookService = new FacebookService()
