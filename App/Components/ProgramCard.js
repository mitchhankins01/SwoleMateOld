import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { View, TouchableOpacity, Text } from 'react-native';

import EditProgram from '../Components/Form';
import { ThemeSelector } from '../Themes';
import styles from './Styles/ProgramCardStyles';

export const EditProgramCard = connect(({ auth }) => auth)(({
  edit, programId, item, theme,
}) => {
  const Colors = ThemeSelector(theme);
  return (
    <View
      style={[
        styles.modifyContainer,
        { backgroundColor: Colors.bgColor, borderColor: Colors.primaryColor },
      ]}
    >
      <EditProgram edit={edit} item={item} programId={programId} />
    </View>
  );
});

export const ProgramCard = connect(({ auth }) => auth)(({
  icon,
  type,
  title,
  theme,
  onEdit,
  onPress,
  opacity,
  subtitle,
  onDelete,
  onToggleUp,
  onToggleDown,
}) => {
  const Colors = ThemeSelector(theme);
  return (
    <View
      style={[
          styles.container,
          { backgroundColor: Colors.bgColor, borderColor: Colors.primaryColor },
        ]}
    >
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
        <Text style={[styles.title, { color: Colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: Colors.text }]}>{subtitle}</Text>
      </TouchableOpacity>
      <View style={styles.rightSection}>
        <Icon
          size={25}
          type="entypo"
          name="arrow-up"
          onPress={onToggleUp}
          underlayColor="transparent"
          color={Colors.primaryColor}
          ontainerStyle={{ padding: 10 }}
        />
        <Icon
          size={25}
          type="entypo"
          name="arrow-down"
          onPress={onToggleDown}
          underlayColor="transparent"
          color={Colors.primaryColor}
          ontainerStyle={{ padding: 10 }}
        />
      </View>
    </View>
  );
});
