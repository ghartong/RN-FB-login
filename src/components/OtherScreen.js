import * as React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

export default class OtherScreen extends React.Component {
    static navigationOptions = {
        title: 'Lots of features here',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>This is some other page.</Text>
                <Button
                    title="Go to first counter screen"
                    onPress={() => this.props.navigation.navigate('Counter')}
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
});
