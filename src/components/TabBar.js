import React, { Component } from 'react';
import { Platform } from 'react-native';
import { TabBarBottom } from 'react-navigation';
import firebase from 'react-native-firebase';
import themeStyles from './styles';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = { theme: 'standard' };
  }

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;

    firebase.firestore().collection('users').doc(uid)
      .onSnapshot(userDoc => {
          this.setState({ theme: userDoc.data().theme });
      });
  }

  render() {
    const styles = themeStyles[this.state.theme];

    return (
      <TabBarBottom
      {...this.props}
      activeTintColor={styles.$primaryColor}
      inactiveTintColor={styles.$primaryColor}
      style={{
        backgroundColor: styles.$secondaryColor,
        height: Platform.OS === 'android' ? 55 : 52
      }}
      labelStyle={{ fontFamily: 'exo', fontSize: 14 }}
      />
    );
  }
}

export default TabBar;
