import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';
import themeStyles from '../components/styles';

class Login extends Component {
  static navigationOptions: {
    gesturesEnabled: false,
    headerLeft: null
  }

  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  onLoginFail(error) {
    this.setState({ loading: false });
    this.dropdown.alertWithType('error', 'Something went wrong', error.message);
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  registerPressed() {
    const { email, password } = this.state;

    this.props.navigation.navigate('Register', { email, password });
  }

  loginPressed() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // this.dropdown.alertWithType(
      //   'success',
      //   'Login Successfull',
      //   'You have been logged in successfully!'
      // );
      this.onLoginSuccess.bind(this);
    })
    .catch((error) => {
      this.onLoginFail(error);
    });
  }

  renderFormComponent(
    styles, label, capitalize, autoCorrect, secureTextEntry, keyboardType, value) {
    return (
      <View>
        <FormLabel
          containerStyle={styles.formLabel}
          labelStyle={styles.formLabelText}
        >
          {label}
        </FormLabel>
        <FormInput
          inputStyle={styles.input}
          autoCapitalize={capitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          underlineColorAndroid='#FFF'
          value={this.state[value]}
          onChangeText={change => this.setState({ [value]: change })}
        />
      </View>
    );
  }

  renderButton(styles, icon, typeIcon, title, email, password, func) {
    return (
      <Button
        raised
        icon={{ name: icon, type: typeIcon }}
        title={title}
        buttonStyle={styles.buttonStyle}
        containerViewStyle={{ backgroundColor: 'transparent' }}
        fontFamily='Exo-Medium'
        onPress={func}
      />
    );
  }

  render() {
    const { email, password } = this.state;
    const styles = themeStyles.standard;
    const gradients = [
      styles.$primaryColor,
      styles.$secondaryColor,
      styles.$tertiaryColor
    ];

    return (
      <LinearGradient
        colors={gradients}
        style={styles.container}
      >
        <KeyboardAvoidingView behavior='padding' onClick={() => Keyboard.dismiss()}>
          <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
          <Text style={styles.appName}>SwoleMate</Text>
          <Text style={styles.header}>Login</Text>
          {this.renderFormComponent(
            styles, 'Email', 'none', false, false, 'email-address', 'email'
          )}
          {this.renderFormComponent(
            styles, 'Password', 'none', false, true, 'default', 'password'
          )}
          <View
            style={{
              paddingTop: 50,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            {this.renderButton(
              styles,
              'person-add',
              'MaterialIcons',
              'Register',
              email,
              password,
              this.registerPressed.bind(this)
            )}
            {this.renderButton(
              styles,
              this.state.loading ? 'cog' : 'check',
              'entypo',
              this.state.loading ? 'Loading' : 'Login',
              email,
              password,
              this.loginPressed.bind(this)
            )}
          </View>
        </KeyboardAvoidingView>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          updateStatusBar={false}
          closeInterval={7000}
          translucent
        />
      </LinearGradient>
    );
  }
}

export default Login;
