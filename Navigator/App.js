import React, { Component } from 'react';
import { Navigator, NativeModules } from 'react-native';

import AppNavigator from './AppNavigator';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 'home',
        };
    }

    render() {
        return (
            <AppNavigator value={this.state} />
        );
    }
}

export default App

// referenced https://medium.com/@kevinle/comprehensive-routing-and-navigation-in-react-native-made-easy-6383e6cdc293