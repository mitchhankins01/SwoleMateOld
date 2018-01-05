import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import themeStyles from './styles';

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
          {renderIcon(styles, 'check', 25, () => programStore.resetError())}
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
      containerStyle={styles.iconContainer}
    />
  );
};

export default inject('userStore', 'programStore')(observer((props) => {
  const styles = themeStyles[props.userStore.selected];

  return (
    <Animatable.View style={styles.containerStyle} animation='zoomIn'>
      <Text style={styles.title}>{props.title}</Text>
      <ScrollView><Text style={styles.message}>{props.message}</Text></ScrollView>
      {getIcons(styles, props)}
    </Animatable.View>
  );
}));
