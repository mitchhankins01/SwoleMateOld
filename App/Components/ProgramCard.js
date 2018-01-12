import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { Colors } from '../Themes';
import styles from './Styles/ProgramCardStyles';

const ProgramCard = () => (
  <View style={styles.container}>
    <View style={styles.leftSection}>
      <Icon name="edit" type="entypo" color={Colors.primaryColor} size={25} />
      <Icon name="trash" type="entypo" color={Colors.primaryColor} size={25} />
    </View>
    <View style={styles.centerSection}>
      <Icon name="dumbbell" type="material-community" color={Colors.text} size={20} />
      <Text style={styles.title}>Exercise Name</Text>
      <Text style={styles.subtitle}>2 Sets - 3 Reps - 70s Rest</Text>
    </View>
    <View style={styles.rightSection}>
      <Icon name="arrow-up" type="entypo" color={Colors.primaryColor} size={25} />
      <Icon name="arrow-down" type="entypo" color={Colors.primaryColor} size={25} />
    </View>
  </View>
);

export default ProgramCard;
