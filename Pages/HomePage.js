import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          data: [],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to the Home Page
                </Text>
            </View>
        );
    }
}

HomePage.navigationOptions = {
    title: 'Home',
}

export default HomePage

// referenced https://medium.com/@kevinle/comprehensive-routing-and-navigation-in-react-native-made-easy-6383e6cdc293