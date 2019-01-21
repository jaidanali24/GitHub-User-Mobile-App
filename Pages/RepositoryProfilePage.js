import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TabRouter } from 'react-navigation';
import { BottomNavigation, ThemeProvider, COLOR } from 'react-native-material-ui';
import PropTypes from 'prop-types';

import Container from './Container';
import RepositoryProfile from './RepositoryProfile';
import RepositoriesPage from './RepositoriesPage';
import FollowersPage from './FollowersPage';
import FollowingPage from './FollowingPage';
import contactData from './contact.json';

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
  },
  scroll: {
    backgroundColor: '#FFF',
  },
});

const uiTheme = {
    palette: {
        primaryColor: COLOR.blue500
    }
};

class RepositoryProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'Repositories',
            full_name: 'bitcoin/bitcoin',
            data: [],
            owner_data: [],
            stats_data: []
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        let url = "https://api.github.com/repos/" + this.state.full_name + "?client_id=fb595bda322476988884&client_secret=19064d9b020d326caea7a33366078b09f2d12a33";
        fetch(url)
            .then(response => response.json())
            .then(response => {
                this.setState({ data: response, owner_data: response.owner })
            })
            .catch(error => console.log(error));

        let stats_url = "https://api.github.com/repos/" + this.state.full_name + "/stats/participation?client_id=fb595bda322476988884&client_secret=19064d9b020d326caea7a33366078b09f2d12a33"
        fetch(stats_url)
            .then(response => response.json())
            .then(response => {
                this.setState({ stats_data: response })
            })
            .catch(error => console.log(error));
    }

    handleTabPress = ({ routename }) => {
        this.setState({ active: routename });
        this.props.navigation.navigate(routename);
    }

    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <Container>
                    <RepositoryProfile {...this.state.data} {...this.state.owner_data} {...this.state.stats_data} />
                    <BottomNavigation active={this.state.active} hidden={false}
                        style={{ container: { position: 'absolute', bottom: 0, left: 0, right: 0 } }}
                    >
                        <BottomNavigation.Action
                            key='subscribers'
                            icon='watch-later'
                            label='Subscribers'
                            onPress = {() =>
                                this.handleTabPress({ routename: 'Repositories' })
                            }
                        />
                        <BottomNavigation.Action
                            key='stargazers'
                            icon='stars'
                            label='Stargazers'
                            onPress = {() =>
                                this.handleTabPress({ routename: 'Followers' })
                            }
                        />
                        <BottomNavigation.Action
                            key='forks'
                            icon='call-split'
                            label='Forks'
                            onPress = {() =>
                                this.handleTabPress({ routename: 'Following' })
                            }
                        />
                    </BottomNavigation>
                </Container>
            </ThemeProvider>
        );
    }
}

RepositoryProfilePage.navigationOptions = {
    title: 'RepositoryProfile',
}

export default RepositoryProfilePage

// referenced https://medium.com/@kevinle/comprehensive-routing-and-navigation-in-react-native-made-easy-6383e6cdc293
// used https://github.com/nattatorn-dev/react-native-user-profile