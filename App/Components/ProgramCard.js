import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import AddWorkout from '../Components/Form';
import { Colors } from '../Themes';
import styles from './Styles/ProgramCardStyles';

export const ModifyProgramCard = props => (
  <View style={styles.modifyContainer}>
    <AddWorkout />
  </View>
);

export const ProgramCard = ({
  icon, type, title, subtitle, onPress, opacity, onDelete,
}) => (
  <View style={styles.container}>
    <View style={styles.leftSection}>
      <Icon
        containerStyle={{ padding: 10 }}
        size={25}
        name="edit"
        type="entypo"
        underlayColor="transparent"
        color={Colors.primaryColor}
      />
      <Icon
        containerStyle={{ padding: 10 }}
        size={25}
        name="trash"
        type="entypo"
        onPress={onDelete}
        underlayColor="transparent"
        color={Colors.primaryColor}
      />
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
