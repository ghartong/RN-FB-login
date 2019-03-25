import * as React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import {actions} from '../../reducers/counterReducer'
import {actions as userActions} from '../../reducers/userReducer'

class Counter extends React.Component {
    static navigationOptions = {
        title: 'Counter!',
    };

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.setLoggedIn(true)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{this.props.count}</Text>
                <Button
                    title="Increment"
                    onPress={() => this.props.incrementCounter()}
                />
                <Button
                    title="Decrement"
                    onPress={() => this.props.decrementCounter()}
                />

                <Button
                    title="Go to static count screen"
                    onPress={() => this.props.navigation.navigate('StaticCounter')}
                />
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
const getCounterState = state => {
    return {
      count: state.counter.count
    }
  }
export default connect(getCounterState, Object.assign({}, actions, userActions) )(Counter);
  