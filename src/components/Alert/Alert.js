import React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import themeStyles from './styles';

const getContent = (styles, props) => {
  switch (props.input) {
    default:
      return <ScrollView><Text style={styles.message}>{props.message}</Text></ScrollView>;
    case true:
      return (
        <ScrollView>
          <Text style={styles.message}>{props.message}</Text>
          <TextInput
            value={props.value}
            style={props.style}
            underlineColorAndroid='transparent'
            onChangeText={props.onChangeText}
          />
        </ScrollView>
      );
  }
};

const getIcons = (styles, { acknowledge, programStore, onPressClose, onPressSave }) => {
  switch (acknowledge) {
    default:
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {renderIcon(styles, 'cross', 30, () => {
            onPressClose();
            programStore.resetError();
          })}
          {renderIcon(styles, 'check', 25, () => {
            onPressSave();
            programStore.resetError();
          })}
        </View>
      );
    case true:
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {renderIcon(styles, 'check', 25, () => {
            onPressSave();
            programStore.resetError();
          })}
        </View>
      );
  }
};

const renderIcon = (styles, name, size, onPress) => {
  return (
    <Icon
      name={name}
      size={size}
      type='entypo'
      color='#EDF0F1'
      onPress={onPress}
      underlayColor='transparent'
      containerStyle={styles.iconContainer}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    />
  );
};

export default inject('userStore', 'programStore')(observer((props) => {
  const styles = themeStyles[props.userStore.selected];

  return (
    <View style={styles.container}>
      <Animatable.View style={styles.alertContainer} duration={500} animation='awesomeIn'>
        <Text style={styles.title}>{props.title}</Text>
        {getContent(styles, props)}
        {getIcons(styles, props)}
      </Animatable.View>
    </View>
  );
}));
