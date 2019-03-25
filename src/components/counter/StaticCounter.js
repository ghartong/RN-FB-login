import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'

// Another screen!
class StaticCounter extends React.Component {
    static navigationOptions = {
        title: `Same number, wow!`,
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>{this.props.count}</Text>
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
const getStaticCounterState = state => {
    return {
        count: state.counter.count
    }
}
export default connect(getStaticCounterState)(StaticCounter)
