import React from 'react';
import { Icon } from 'react-native-elements';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './Styles/SettingsCardStyles';

export const undef = () => {};

export const SettingsCard = ({
  icon, type, title, theme, onPress, opacity,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={opacity} style={styles.container}>
    <View style={styles.leftSection}>
      <Icon name={icon} type={type} color={styles.$textColor} size={25} />
    </View>
    <View style={styles.centerSection}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.rightSection} />
  </TouchableOpacity>
);
