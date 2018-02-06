import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { View, TouchableOpacity, Text } from 'react-native';

import { ThemeSelector } from '../Themes';
import styles from './Styles/SettingsCardStyles';

export const undef = () => {};

export const SettingsCard = connect(({ auth }) => auth)(({
  icon, type, title, theme, onPress, opacity,
}) => {
  const Colors = ThemeSelector(theme);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={opacity}
      style={[
          styles.container,
          { backgroundColor: Colors.bgColor, borderColor: Colors.primaryColor },
        ]}
    >
      <View style={styles.leftSection}>
        <Icon name={icon} type={type} color={Colors.text} size={25} />
      </View>
      <View style={styles.centerSection}>
        <Text style={[styles.title, { color: Colors.text }]}>{title}</Text>
      </View>
      <View style={styles.rightSection} />
    </TouchableOpacity>
  );
});
