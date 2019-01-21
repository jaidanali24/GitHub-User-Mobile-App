import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Linking } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

class RepositoriesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      page: 1,
      username: 'jaidanali24',
      data: [],
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, username } = this.state;
    const url = "https://api.github.com/users/" + username + "/repos?page=" + page + "&client_id=fb595bda322476988884&client_secret=19064d9b020d326caea7a33366078b09f2d12a33";
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({ data: page === 1 ? res : [...this.state.data, ...res] });
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
    this.setState({ loading: false });
  };

   handleLoadMore = () => {
     this.setState(
       {
         page: this.state.page + 1
       },
       () => {
         this.makeRemoteRequest();
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

  renderHeader = () => {
    return <SearchBar placeholder="Search your repositories..." lightTheme/>;
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
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name}`}
              subtitle={item.description}
              avatar={{ uri: item.owner.avatar_url }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPressRightIcon = {() =>
                Linking.openURL(item.html_url)
              }
              onPress = {() =>
                Linking.openURL(item.html_url)
              }
            />
          )}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={10}
        />
      </List>
    );
  }
}

RepositoriesPage.navigationOptions = {
    title: 'Repositories',
}

export default RepositoriesPage;

// used https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
