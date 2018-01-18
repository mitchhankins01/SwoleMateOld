import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import LinearGradient from 'react-native-linear-gradient';
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Colors, Constants } from '../Themes/';
import Alert from '../Components/Alert';
import * as Actions from '../Redux/Actions/Auth';
import styles, { gradients, textColor } from './Styles/RegisterStyles';

class Register extends Component {
  state = { email: '', password: '' };

  createUser = async () => {
    const { email, password, name } = this.state;

    try {
      const response = await this.props.signupUserMutation({
        variables: {
          email,
          password,
          name: 'Name',
          theme: 'standard',
          imperial: true,
        },
      });
      // localStorage.setItem("graphcoolToken", response.data.signupUser.token);
      console.log(response.data.signupUser.token);
    } catch (e) {
      console.error('An error occurred: ', e);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Text style={styles.appName}>SwoleMate</Text>
        <Text style={styles.header}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="E-Mail"
          autoCapitalize="none"
          value={this.state.email}
          keyboardType="email-address"
          placeholderTextColor={textColor}
          underlineColorAndroid="transparent"
          onChangeText={input => this.setState({ email: input })}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
          placeholder="Password"
          value={this.state.password}
          placeholderTextColor={textColor}
          underlineColorAndroid="transparent"
          onChangeText={input => this.setState({ password: input })}
        />
        {/* {loading ? (
          <ProgressBar
            useNativeDriver
            indeterminate
            style={styles.progress}
            color={Colors.primaryColor}
            width={Constants.DEV_WIDTH}
          />
        ) : null}
        {error ? (
          <Alert acknowledge title="Whoops" message={error} onPressSave={resetAuth} />
        ) : null} */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="person-add" iconStyle={styles.icon} />
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.createUser(email, password)}
          >
            <Icon name="check" type="entypo" iconStyle={styles.icon} />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const SIGNUP_EMAIL_USER = gql`
  mutation SignupUser(
    $email: String!
    $password: String!
    $name: String!
    $theme: String!
    $imperial: Boolean!
  ) {
    signupUser(
      email: $email
      password: $password
      name: $name
      theme: $theme
      imperial: $imperial
    ) {
      id
      token
    }
  }
`;

export default graphql(SIGNUP_EMAIL_USER, { name: 'signupUserMutation' })(
  Register,
);
