import { Text } from 'react-native';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { Card } from '../components/Card';
import themeStyles from '../components/styles';

class Workout extends Component {
  render() {
    //const styles = themeStyles[this.props.theme];
    const styles = themeStyles.standard;
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    return (
      <LinearGradient colors={gradients} style={styles.container} >
        <Card reusable>
          <Text style={styles.appName}>Exercise Name</Text>
        </Card>
      </LinearGradient>
    );
  }
}

export default Workout;
