import React, { Component } from 'react';
import { Navigator, NativeModules } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import RepositoriesPage from './RepositoriesPage';
import FollowersPage from './FollowersPage';
import FollowingPage from './FollowingPage';
import SearchPage from './SearchPage';
import RepositoryProfilePage from './RepositoryProfilePage';
import NotificationsPage from './NotificationsPage';
import HeaderBar from './HeaderBar';
import DrawerMenu from './DrawerMenu';

const stackNavigator = StackNavigator({
    Home: { screen: HomePage,
            navigationOptions: ({ navigation }) => ({
                header: <HeaderBar navigation={navigation} page='Home' />,
            })
          },
    Profile: { screen: ProfilePage,
               navigationOptions: ({ navigation }) => ({
                   header: <HeaderBar navigation={navigation} page='Profile' />,
               })
             },
    Repositories: { screen: RepositoriesPage,
               navigationOptions: ({ navigation }) => ({
                   header: <HeaderBar navigation={navigation} page='Repositories' />,
               })
             },
    Followers: { screen: FollowersPage,
               navigationOptions: ({ navigation }) => ({
                   header: <HeaderBar navigation={navigation} page='Followers' />,
               })
             },
    Following: { screen: FollowingPage,
               navigationOptions: ({ navigation }) => ({
                   header: <HeaderBar navigation={navigation} page='Following' />,
               })
             },
    Search: { screen: SearchPage,
               navigationOptions: ({ navigation }) => ({
                   header: <HeaderBar navigation={navigation} page='Search' />,
               })
             },
    RepositoryProfile: { screen: RepositoryProfilePage,
               navigationOptions: ({ navigation }) => ({
                   header: <HeaderBar navigation={navigation} page='RepositoryProfile' />,
               })
             },
    Notifications: { screen: NotificationsPage,
               navigationOptions: ({ navigation }) => ({
                   header: <HeaderBar navigation={navigation} page='Notifications' />,
               })
             },
});

const AppDrawer = DrawerNavigator({
    Stack: { screen: stackNavigator }
}, {
    contentComponent: ({ navigation }) => <DrawerMenu navigation={navigation} />
});

class AppNavigator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value !== this.props.value) {
            this.setState({active: nextProps.value});
        }
    }

    render() {
        return (
            <AppDrawer />
        );
    }
}

export default AppNavigator

// referenced https://medium.com/@kevinle/comprehensive-routing-and-navigation-in-react-native-made-easy-6383e6cdc293