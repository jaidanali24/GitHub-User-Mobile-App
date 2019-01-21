import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Linking } from "react-native";
import { List, ListItem, ButtonGroup, SearchBar } from "react-native-elements";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      refreshing: false,
      text: '',
      data: [],
      selection: 0,
      val: 0,
    };

    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selection: selectedIndex })
  }

  makeUserRemoteRequest = () => {
    const url = "https://api.github.com/search/users?q=" + this.state.text + "&page=1&client_id=fb595bda322476988884&client_secret=19064d9b020d326caea7a33366078b09f2d12a33";
    this.setState({ loading: true, selection: 0 });
    //console.log("URL: " + url);
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res.items });
        this.setState({ loading: false });
        this.setState({ refreshing: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
    this.setState({ loading: false });
}

  makeRepositoryRemoteRequest = () => {
      const url = "https://api.github.com/search/repositories?q=" + this.state.text + "&page=1&client_id=fb595bda322476988884&client_secret=19064d9b020d326caea7a33366078b09f2d12a33";
      this.setState({ loading: true, selection: 1 });
      //console.log("URL: " + url);
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.setState({ data: res.items });
          this.setState({ loading: false });
          this.setState({ refreshing: false });
        })
        .catch(error => {
          this.setState({ loading: false });
          console.log(error);
        });
      this.setState({ loading: false });
  };

  filterUserRemoteRequest = () => {
      const url = "https://api.github.com/search/users?q=" + this.state.text + "+followers:>" + this.state.val + "&page=1&client_id=fb595bda322476988884&client_secret=19064d9b020d326caea7a33366078b09f2d12a33";
      this.setState({ loading: true, selection: 0 });
      //console.log("URL: " + url);
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.setState({ data: res.items });
          this.setState({ loading: false });
          this.setState({ refreshing: false });
        })
        .catch(error => {
          this.setState({ loading: false });
          console.log(error);
        });
      this.setState({ loading: false });
  };

    filterRepositoryRemoteRequest = () => {
        const url = "https://api.github.com/search/repositories?q=" + this.state.text + "+stars:>" + this.state.val + "&page=1&client_id=fb595bda322476988884&client_secret=19064d9b020d326caea7a33366078b09f2d12a33";
        this.setState({ loading: true, selection: 1 });
        //console.log("URL: " + url);
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({ data: res.items });
            this.setState({ loading: false });
            this.setState({ refreshing: false });
          })
          .catch(error => {
            this.setState({ loading: false });
            console.log(error);
          });
        this.setState({ loading: false });
    };

  makeFollowRequest = ({ username }) => {
    const url = "https://api.github.com/user/following/" + username + "?access_token=4fc87f60236f841f57a547e7bc04b27f52910988";

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: 'Content-Length: 0',

    })
    .then(res => res.json())
    .catch(error => console.log(error));
  };

  handleUserRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        loading: true,
      },
      () => {
        this.makeUserRemoteRequest();
      }
    );
  };

  handleRepositoryRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        loading: true,
      },
      () => {
        this.makeRepositoryRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  renderButtonGroup = () => {
      const buttons = ['Users', 'Repositories'];
      const { selectedIndex } = this.state.selection;
      return (
          <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{height: 50}}
          />
      )
  }

  renderFilterBar = () => {
    if (this.state.selection == 0) {
        return (
            <SearchBar placeholder="Filter by number of followers..." lightTheme clearIcon
                onChangeText = {text => {
                    this.setState({ val: text });
                    setTimeout(this.filterUserRemoteRequest, 2000);
                }}
            />
        );
    }
    if (this.state.selection == 1) {
        return (
            <SearchBar placeholder="Filter by number of stars..." lightTheme clearIcon
                onChangeText = {text => {
                    this.setState({ val: text });
                    setTimeout(this.filterRepositoryRemoteRequest, 2000);
                }}
            />
        );
    }
  }

  renderSearchBar = () => {
      if (this.state.selection == 0) {
          return (
              <SearchBar placeholder="Search users..." lightTheme clearIcon
                  onChangeText = {text => {
                      this.setState({ text: text });
                      this.makeUserRemoteRequest();
                      setTimeout(this.handleUserRefresh, 2000);
                  }}
                  onClear = {() => {
                    this.setState({ text: '' });
                    this.handleUserRefresh();
                  }}
              />
          );
      }
      if (this.state.selection == 1) {
          return (
              <SearchBar placeholder="Search repositories..." lightTheme clearIcon
                  onChangeText = {text => {
                      this.setState({ text: text });
                      this.makeRepositoryRemoteRequest();
                      setTimeout(this.handleRepositoryRefresh, 2000);
                  }}
                  onClear ={() => {
                    this.setState({ text: '' });
                    this.handleRepositoryRefresh();
                  }}
              />
          );
      }
  }

  renderHeader = () => {
    const buttonGroup = this.renderButtonGroup();
    const searchBar = this.renderSearchBar();
    const filterBar = this.renderFilterBar();
    return (
        <View>
            {buttonGroup}
            {searchBar}
            {filterBar}
        </View>
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    //console.log("TEXT: " + this.state.text);
    if (this.state.text !== '') {
        if (this.state.selection == 0) {
            return (
              <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                  data={this.state.data}
                  renderItem={({ item }) => (
                    <ListItem
                      roundAvatar
                      title={`${item.login}`}
                      avatar={{ uri: item.avatar_url }}
                      containerStyle={{ borderBottomWidth: 0 }}
                      rightIcon={{ name: 'star' }}
                      onPressRightIcon={()=>
                        this.makeFollowRequest({ username: item.login })
                      }
                      onPress = {() =>
                        Linking.openURL(item.html_url)
                      }
                    />
                  )}
                  keyExtractor={item => item.login}
                  ItemSeparatorComponent={this.renderSeparator}
                  ListHeaderComponent={this.renderHeader}
                  ListFooterComponent={this.renderFooter}
                />
              </List>
            );
        }
        if (this.state.selection == 1) {
            return (
              <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                  data={this.state.data}
                  renderItem={({ item }) => (
                    <ListItem
                      roundAvatar
                      title={`${item.full_name}`}
                      avatar={{ uri: item.owner.avatar_url }}
                      containerStyle={{ borderBottomWidth: 0 }}
                      onPressRightIcon={()=>
                        Linking.openURL(item.html_url)
                      }
                      onPress = {() =>
                        this.props.navigation.navigate('RepositoryProfile')
                      }
                    />
                  )}
                  keyExtractor={item => item.full_name}
                  ItemSeparatorComponent={this.renderSeparator}
                  ListHeaderComponent={this.renderHeader}
                  ListFooterComponent={this.renderFooter}
                />
              </List>
            );
        }
    } else {
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={[]}
                    keyExtractor={item => item.login}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                />
            </List>
        );
    }
  }
}

SearchPage.navigationOptions = {
    title: 'Search',
};

export default SearchPage;

// used https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6

