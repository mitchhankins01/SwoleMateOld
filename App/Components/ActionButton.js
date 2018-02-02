import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { ThemeSelector } from '../Themes';
import styles from './Styles/ActionButtonStyles';

const ActionButton = ({ buttons, theme }) => {
  const Colors = ThemeSelector(theme);
  return (
    <View
      style={[
        styles.actionView,
        {
          borderTopWidth: 1,
          borderColor: Colors.primaryColor,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
      ]}
    >
      {buttons.map(button => (
        <Animatable.View animation={button.animation} key={button.icon}>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {
                borderColor: Colors.primaryColor,
                shadowColor: Colors.primaryColor,
              },
            ]}
            onPress={button.onPress}
          >
            <Icon
              name={button.icon}
              type={button.type ? button.type : 'entypo'}
              iconStyle={[styles.iconContainer, { color: Colors.primaryColor }]}
            />
          </TouchableOpacity>
        </Animatable.View>
      ))}
    </View>
  );
};

export default connect(({ auth }) => auth)(ActionButton);
