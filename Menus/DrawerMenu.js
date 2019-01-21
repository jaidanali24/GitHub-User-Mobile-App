import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigator, NativeModules } from 'react-native';
import { Toolbar, Drawer, ThemeProvider, COLOR } from 'react-native-material-ui';
import PropTypes from 'prop-types';

import Container from './Container';

const uiTheme = {
    palette: {
        primaryColor: COLOR.blue500
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

const DrawerMenu = ({ navigation }) => (
    <ThemeProvider uiTheme={uiTheme}>
        <Container>
            <Toolbar
                leftElement = 'arrow-back'
                onLeftElementPress = { () => navigation.navigate('DrawerClose') }
                centerElement = { 'Menu' }
            />
            <View style={styles.container}>
                <Drawer>
                    <Drawer.Section
                        items = {[
                            {
                                icon: 'home', value: 'Home',
                                onPress: () => {
                                    navigation.navigate('Home');
                                }
                            },
                            {
                                icon: 'person', value: 'Profile',
                                onPress: () => {
                                    navigation.navigate('Profile');
                                }
                            },
                            {
                                icon: 'storage', value: 'Repositories',
                                onPress: () => {
                                    navigation.navigate('Repositories');
                                }
                            },
                            {
                                icon: 'people-outline', value: 'Followers',
                                onPress: () => {
                                    navigation.navigate('Followers');
                                }
                            },
                            {
                                icon: 'people', value: 'Following',
                                onPress: () => {
                                    navigation.navigate('Following');
                                }
                            },
                            {
                                icon: 'notifications', value: 'Notifications',
                                onPress: () => {
                                    navigation.navigate('Notifications');
                                }
                            },
                        ]}
                    />
                </Drawer>
            </View>
        </Container>
    </ThemeProvider>
);

DrawerMenu.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default DrawerMenu

// referenced https://medium.com/@kevinle/comprehensive-routing-and-navigation-in-react-native-made-easy-6383e6cdc293