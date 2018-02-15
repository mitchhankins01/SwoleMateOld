import React from 'react';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { View, Text, ScrollView, TextInput } from 'react-native';

import styles from './Styles/AlertStyles';

const renderIcon = (name, size, onPress) => (
  <Icon
    name={name}
    size={size}
    type="entypo"
    onPress={onPress}
    iconStyle={styles.icon}
    underlayColor="transparent"
    containerStyle={styles.iconContainer}
    hitSlop={{
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    }}
  />
);

const getContent = (props) => {
  switch (props.input) {
    default:
      return (
        <ScrollView>
          <Text style={styles.message}>{props.message}</Text>
        </ScrollView>
      );
    case true:
      return (
        <ScrollView>
          <Text style={styles.message}>{props.message}</Text>
          <TextInput
            value={props.value}
            style={props.style}
            underlineColorAndroid="transparent"
            onChangeText={props.onChangeText}
          />
        </ScrollView>
      );
  }
};

const getIcons = ({ acknowledge, onPressClose, onPressSave }) => {
  switch (acknowledge) {
    default:
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {renderIcon('cross', 30, () => {
            onPressClose();
          })}
          {renderIcon('check', 25, () => {
            onPressSave();
          })}
        </View>
      );
    case true:
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {renderIcon('check', 25, () => {
            onPressSave();
          })}
        </View>
      );
  }
};

const Alert = props => (
  <View style={styles.container}>
    <Animatable.View duration={500} animation="awesomeIn" style={styles.alertContainer}>
      <Text style={styles.title}>{props.title}</Text>
      {getContent(props)}
      {getIcons(props)}
    </Animatable.View>
  </View>
);

export default Alert;
