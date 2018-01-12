import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { Colors } from '../Themes';
import styles from './Styles/ProgramCardStyles';

const ProgramCard = ({
  icon, type, title, subtitle, onPress, opacity,
}) => (
  <View style={styles.container}>
    <View style={styles.leftSection}>
      <Icon name="edit" type="entypo" color={Colors.primaryColor} size={25} />
      <Icon name="trash" type="entypo" color={Colors.primaryColor} size={25} />
    </View>
    <TouchableOpacity style={styles.centerSection} onPress={onPress} activeOpacity={opacity}>
      <Icon name={icon} type={type} color={Colors.text} size={20} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
    <View style={styles.rightSection}>
      <Icon name="arrow-up" type="entypo" color={Colors.primaryColor} size={25} />
      <Icon name="arrow-down" type="entypo" color={Colors.primaryColor} size={25} />
    </View>
  </View>
);

export default ProgramCard;
