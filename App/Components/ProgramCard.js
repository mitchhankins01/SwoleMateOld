/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { View, TouchableOpacity, Text } from 'react-native';

import EditProgram from '../Components/Form';
import styles from './Styles/ProgramCardStyles';

export const EditProgramCard = connect(({ auth }) => auth)(({ edit, programId, item }) => (
  <View style={styles.modifyContainer}>
    <EditProgram edit={edit} item={item} programId={programId} />
  </View>
));

export const ProgramCard = ({
  icon,
  type,
  title,
  onEdit,
  onPress,
  opacity,
  subtitle,
  onDelete,
  onToggleUp,
  onToggleDown,
}) => (
  <View style={styles.container}>
    <View style={styles.leftSection}>
      <Icon
        size={25}
        name="edit"
        type="entypo"
        onPress={onEdit}
        color={styles.$primary}
        underlayColor="transparent"
        containerStyle={{ padding: 10 }}
      />
      <Icon
        size={25}
        name="trash"
        type="entypo"
        onPress={onDelete}
        color={styles.$primary}
        underlayColor="transparent"
        containerStyle={{ padding: 10 }}
      />
    </View>
    <TouchableOpacity style={styles.centerSection} onPress={onPress} activeOpacity={opacity}>
      <Icon name={icon} type={type} color={styles.$textColor} size={20} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
    <View style={styles.rightSection}>
      <Icon
        size={25}
        type="entypo"
        name="arrow-up"
        onPress={onToggleUp}
        color={styles.$primary}
        underlayColor="transparent"
        ontainerStyle={{ padding: 10 }}
      />
      <Icon
        size={25}
        type="entypo"
        name="arrow-down"
        onPress={onToggleDown}
        color={styles.$primary}
        underlayColor="transparent"
        ontainerStyle={{ padding: 10 }}
      />
    </View>
  </View>
);
