import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import firebase from 'react-native-firebase';

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  componentWillMount() {
    const uid = firebase.auth().currentUser.uid;

    firebase.firestore().collection('users').doc(uid).get()
    .then(userDoc => {
      this.setState({ name: userDoc.data().name });
    });
  }

  render() {
    const { styles } = this.props;

    const dateNow = new Date();
    let greeting = '';

    if (dateNow.getHours() < 12) {
      greeting = 'Good Morning';
    } else if (dateNow.getHours() >= 12 && dateNow.getHours() <= 17) {
      greeting = 'Good Afternoon';
    } else if (dateNow.getHours() > 17 && dateNow.getHours() <= 24) {
      greeting = 'Good Evening';
    } else { greeting = 'Welcome'; }

    return (
      <Animatable.Text
        animation='zoomInUp'
        duration={1500}
        delay={0}
        style={[
          styles.header,
          { fontSize: 22, color: styles.$tertiaryColor, marginTop: 20, marginBottom: 10 }
        ]}
      >
        {`${greeting}, ${this.state.name}`}
      </Animatable.Text>
    );
  }
}

export default Greeting;
