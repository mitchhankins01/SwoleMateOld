import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput, Text, TouchableOpacity, View, StatusBar } from 'react-native';

import Alert from '../Components/Alert';
import styles, { gradients, textColor } from './Styles/LoginStyles';

export default class Login extends Component {
  state = { email: '', password: '' };

  render() {
    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Text style={styles.appName}>SwoleMate</Text>
        <Text style={styles.header}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="E-Mail"
          autoCapitalize="none"
          value={this.state.email}
          keyboardType="email-address"
          placeholderTextColor={textColor}
          underlineColorAndroid="transparent"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Password"
          value={this.state.password}
          placeholderTextColor={textColor}
          underlineColorAndroid="transparent"
          onChangeText={password => this.setState({ password })}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="person-add" iconStyle={styles.icon} />
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="check" type="entypo" iconStyle={styles.icon} />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}
