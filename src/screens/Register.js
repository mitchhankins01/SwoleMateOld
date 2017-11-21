import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, FormLabel, FormInput, ButtonGroup } from 'react-native-elements';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';
import themeStyles from '../components/styles';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
      loading: false,
      sex: 0,
      imperial: true,
      theme: 'standard'
    };
    this.onFail = this.onFail.bind(this);
  }

  componentWillMount() {
    const { email, password } = this.props.navigation.state.params;
    // Does AND work?
    if (email && password) {
      this.setState({ email, password });
    }
  }

  onFail(error) {
    this.setState({ loading: false });
    this.dropdown.alertWithType(
      'error',
      'Something went wrong',
      error.message
    );
  }

  clearState() {
    this.setState({
      name: '',
      email: '',
      password: '',
      error: '',
      loading: false,
      sex: 0,
      imperial: true
    });
  }

  writeUserData(uid) {
    const ref = firebase.firestore().collection('users').doc(uid);

    const { name, email, sex, imperial, theme } = this.state;

    ref.set({
      name,
      email,
      sex,
      imperial,
      theme
    })
    .then(() => {
      this.clearState();
    })
    .catch(() => {
      firebase.auth().currentUser.delete();
    });
  }

  registerPressed() {
    const { name, email, password } = this.state;

    if (email && password && name) {
      this.setState({ error: '', loading: true });
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.writeUserData(user.uid);
      })
      .catch(error => {
        this.onFail(error);
      });
    } else {
      const error = { message: 'Please fill out all fields' };
      this.onFail(error);
    }
  }

  handleBGPress(type, index) {
    // Implement
    switch (type) {
      case 'sex':
        this.setState({ sex: index });

        switch (index) {
          case 0: return this.setState({ theme: 'standard' });
          case 1: return this.setState({ theme: 'standard2' });
          case 2: return this.setState({ theme: 'standard3' });
          default: return this.setState({ theme: 'standard' });
        }
      case 'imperial':
        return (
          index === 0
          ? this.setState({ imperial: true })
          : this.setState({ imperial: false })
        );
      default:
        return;
    }
  }

  renderFormComponent(
    styles, label, capitalize, autoCorrect, secureTextEntry, keyboardType, value, maxLength) {
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
        maxLength={maxLength}
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

  renderButtonGroup(styles, label, onPress, selectedIndex, buttons) {
    return (
      <View>
        <FormLabel
          containerStyle={styles.formLabel}
          labelStyle={styles.formLabelText}
        >{label}</FormLabel>
        <ButtonGroup
          onPress={onPress}
          selectedIndex={selectedIndex}
          buttons={buttons}
          selectedBackgroundColor='rgba(237, 240, 241, 0.5)'
          textStyle={styles.buttonGroupText}
          selectedTextStyle={styles.buttonGroupText}
          containerStyle={styles.buttonGroup}
        />
      </View>
    );
  }

  render() {
    const { sex, email, password, imperial, theme } = this.state;
    //const styles = themeStyles[this.props.theme];
    const styles = themeStyles[theme];
    const sexBG = ['Male', 'Female', 'Other'];
    const imperialBG = ['Imperial (lbs)', 'Metric (kgs)'];
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
          <Text style={[styles.header, { marginBottom: 0 }]}>Register</Text>
          {this.renderButtonGroup(
            styles, 'Gender', index => this.handleBGPress('sex', index), sex, sexBG
          )}
          {this.renderFormComponent(
            styles, 'Name', 'words', false, false, 'default', 'name', 10
          )}
          {this.renderFormComponent(
            styles, 'Email', 'none', false, false, 'email-address', 'email', 50
          )}
          {this.renderFormComponent(
            styles, 'Password', 'none', false, true, 'default', 'password', 20
          )}
          {this.renderButtonGroup(
            styles,
            'Units of Measurement',
            index => this.handleBGPress('imperial', index),
            imperial === true ? 0 : 1, imperialBG
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
              'back',
              'entypo',
              'Back',
              email,
              password,
              () => this.props.navigation.goBack(null)
            )}
            {this.renderButton(
              styles,
              this.state.loading ? 'cog' : 'check', 'entypo',
              this.state.loading ? 'Loading' : 'Register',
              email,
              password,
              this.registerPressed.bind(this)
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

export default Register;
