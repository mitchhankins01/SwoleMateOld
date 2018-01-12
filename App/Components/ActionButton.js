import React from 'react';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './Styles/ActionButtonStyles';

const ActionButton = ({ buttons }) => (
  <View style={styles.actionView}>
    {buttons.map(button => (
      <Animatable.View animation={button.animation} key={button.icon}>
        <TouchableOpacity style={styles.buttonContainer} onPress={button.onPress}>
          <Icon iconStyle={styles.iconContainer} name={button.icon} type="entypo" />
        </TouchableOpacity>
      </Animatable.View>
    ))}
  </View>
);

export default ActionButton;
