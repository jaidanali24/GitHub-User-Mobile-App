import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

const propTypes = {
    children: PropTypes.node,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

class Container extends Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

Container.propTypes = propTypes;

export default Container;

// referenced https://medium.com/@kevinle/comprehensive-routing-and-navigation-in-react-native-made-easy-6383e6cdc293