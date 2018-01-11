import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput, Text, TouchableOpacity, View, StatusBar } from 'react-native';

import { Colors, Constants } from '../Themes/';
import Alert from '../Components/Alert';
import * as Actions from '../Redux/Actions/Auth';
import styles, { gradients, textColor } from './Styles/LoginStyles';

class Login extends Component {
  state = { email: '', password: '' };

  render() {
    const { loginUser, auth: { loading } } = this.props;
    const { email, password } = this.state;

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
        {loading ? (
          <ProgressBar
            useNativeDriver
            indeterminate
            style={styles.progress}
            color={Colors.primaryColor}
            width={Constants.DEV_WIDTH}
          />
        ) : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="person-add" iconStyle={styles.icon} />
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => loginUser(email, password)}>
            <Icon name="check" type="entypo" iconStyle={styles.icon} />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => {
    dispatch(Actions.loginUser(email, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
