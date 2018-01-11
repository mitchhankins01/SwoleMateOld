import React, { Component } from 'react';
import { TextInput, Text, TouchableOpacity, View, StatusBar } from 'react-native';

import Alert from '../Components/Alert';
import styles from './Styles/LoginStyles';

export default class Login extends Component {
  state = { email: '', password: '' };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Text style={styles.appName}>SwoleMate</Text>
        <Text style={styles.header}>Login</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="E-Mail"
          value={this.state.email}
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Password"
          value={this.state.password}
          underlineColorAndroid="transparent"
          onChangeText={password => this.setState({ password })}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
