import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import EditProgram from '../Components/Form';
import { Colors } from '../Themes';
import styles from './Styles/ProgramCardStyles';

export const EditProgramCard = ({ edit, programId, item }) => (
  <View style={styles.modifyContainer}>
    <EditProgram edit={edit} item={item} programId={programId} />
  </View>
);

export const ProgramCard = ({
  icon,
  type,
  title,
  subtitle,
  onPress,
  opacity,
  onDelete,
  onEdit,
}) => (
  <View style={styles.container}>
    <View style={styles.leftSection}>
      <Icon
        size={25}
        name="edit"
        type="entypo"
        onPress={onEdit}
        underlayColor="transparent"
        color={Colors.primaryColor}
        containerStyle={{ padding: 10 }}
      />
      <Icon
        size={25}
        name="trash"
        type="entypo"
        onPress={onDelete}
        underlayColor="transparent"
        color={Colors.primaryColor}
        containerStyle={{ padding: 10 }}
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
