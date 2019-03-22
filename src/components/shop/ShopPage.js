import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class ShopPage extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#F5FCFF',
        padding: 10
      },
    })
    
    return (
        <View style={styles.container}>
            <Text>Shop Page</Text>
        </View>
    )
  }
}
