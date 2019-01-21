import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigator, NativeModules } from 'react-native';
import { Toolbar, ThemeProvider, COLOR } from 'react-native-material-ui';
import PropTypes from 'prop-types';

const uiTheme = {
    palette: {
        primaryColor: COLOR.blue500
    }
};

const HeaderBar = ({ navigation, page }) => (
    <ThemeProvider uiTheme={uiTheme}>
        <Toolbar
            leftElement = "menu"
            onLeftElementPress = { () => navigation.navigate('DrawerOpen') }
            centerElement = { page }
            rightElement = "search"
            onRightElementPress = { () => navigation.navigate('Search')}
        />
    </ThemeProvider>
);

HeaderBar.propTypes = {
    navigation: PropTypes.object.isRequired,
    page: PropTypes.string.isRequired
};

export default HeaderBar

// referenced https://medium.com/@kevinle/comprehensive-routing-and-navigation-in-react-native-made-easy-6383e6cdc293
