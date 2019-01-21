import React, { Component } from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TabNavigator } from 'react-navigation';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 45,
  },
  indicatorTab: {
    backgroundColor: '#000',
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  tabBar: {
    backgroundColor: '#EEE',
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
  },
  tabLabelNumber: {
    color: 'gray',
    fontSize: 12.5,
    textAlign: 'center',
  },
  tabLabelText: {
    color: 'black',
    fontSize: 22.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
  },
  userBioText: {
    color: 'gray',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    borderColor: '#d9e5f9',
    borderWidth: 5,
    height: 130,
    width: 130,
    marginBottom: 10,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userInfoRow: {
    marginTop: 1,
  },
  userInfoText: {
    color: '#5B5A5A',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userDateRow: {
    marginTop: 10
  },
  userRepositoriesRow: {
    marginTop: 100
  },
  userFollowRow:{
    marginTop: 1
  },
  userDateText: {
      color: 'gray',
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
})

class Profile extends Component {
  static propTypes = {
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    bio: PropTypes.string,
    blog: PropTypes.string,
    email: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    public_repos: PropTypes.isRequired,
    followers: PropTypes.isRequired,
    following: PropTypes.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }

  renderContactHeader = () => {
    const { avatar_url, name, login, bio, blog, email, created_at, public_repos, followers, following } = this.props;
    var pr_copy = public_repos;
    var fr_copy = followers;
    var fn_copy = following;
    if (public_repos) {
        if (pr_copy.toString().length == 4) {
            pr_copy = pr_copy/1000;
            pr_copy = pr_copy.toString().substring(0, 3) + 'K';
        }
    }
    if (followers) {
        if (fr_copy.toString().length == 4) {
            fr_copy = fr_copy/1000;
            fr_copy = fr_copy.toString().substring(0, 3) + 'K';
        }
    }
    if (following) {
        if (fn_copy.toString().length == 4) {
            fn_copy = fn_copy/1000;
            fn_copy = fn_copy.toString().substring(0, 3) + 'K';
        }
    }

    var cr_copy = created_at;
    if (created_at) {
        cr_copy = cr_copy.substring(0, 4);
    }

    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <Image
            style={styles.userImage}
            source={{
              uri: avatar_url,
            }}
          />
          <View>
            <Text style={styles.userNameText}>{name}</Text>
          </View>
          <View>
            <Text style={styles.userInfoText}>Username: {login}</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoText}>Website: {blog}</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoText}>{email}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>Web & Mobile UI/UX designer</Text>
          </View>
        </View>
        <View style={styles.socialRow}>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#3B5A98"
              name="facebook-with-circle"
              onPress={() => console.log('facebook')}
            />
          </View>
          <View style={styles.socialIcon}>
            <Icon
              size={30}
              type="entypo"
              color="#56ACEE"
              name="twitter-with-circle"
              onPress={() => console.log('twitter')}
            />
          </View>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#DD4C39"
              name="google--with-circle"
              onPress={() => console.log('google')}
            />
          </View>
        </View>
        <View style={styles.userRow}>
          <View style={styles.userDateRow}>
            <Text style={styles.userDateText}>{pr_copy} public repositories, {fr_copy} followers, and {fn_copy} following</Text>
          </View>
          <View style={styles.userFollowRow}>
            <Text style={styles.userDateText}>Member since {cr_copy}</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { repositories, followers, following } = this.props
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          {this.renderContactHeader()}
        </View>
      </ScrollView>
    )
  }
}

export default Profile

// used https://github.com/nattatorn-dev/react-native-user-profile