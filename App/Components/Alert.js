import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { View, Text, ScrollView, TextInput } from 'react-native';

import { ThemeSelector } from '../Themes';
import styles from './Styles/AlertStyles';

const renderIcon = (Colors, name, size, onPress) => (
  <Icon
    name={name}
    size={size}
    type="entypo"
    onPress={onPress}
    color={Colors.text}
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
  const Colors = ThemeSelector(props.theme);
  switch (props.input) {
    default:
      return (
        <ScrollView>
          <Text style={[styles.message, { color: Colors.text }]}>{props.message}</Text>
        </ScrollView>
      );
    case true:
      return (
        <ScrollView>
          <Text style={[styles.message, { color: Colors.text }]}>{props.message}</Text>
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

const getIcons = ({
  acknowledge, onPressClose, onPressSave, theme,
}) => {
  const Colors = ThemeSelector(theme);
  switch (acknowledge) {
    default:
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {renderIcon(Colors, 'cross', 30, () => {
            onPressClose();
            // programStore.resetError();
          })}
          {renderIcon(Colors, 'check', 25, () => {
            onPressSave();
            // programStore.resetError();
          })}
        </View>
      );
    case true:
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {renderIcon(Colors, 'check', 25, () => {
            onPressSave();
            // programStore.resetError();
          })}
        </View>
      );
  }
};

const Alert = (props) => {
  const Colors = ThemeSelector(props.theme);
  return (
    <View style={styles.container}>
      <Animatable.View
        duration={500}
        animation="zoomIn"
        style={[styles.alertContainer, { backgroundColor: Colors.tertiaryColor }]}
      >
        <Text style={[styles.title, { color: Colors.text }]}>{props.title}</Text>
        {getContent(props)}
        {getIcons(props)}
      </Animatable.View>
    </View>
  );
};

export default connect(({ auth }) => auth)(Alert);
