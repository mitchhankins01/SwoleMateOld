import React from 'react';
import { Icon } from 'react-native-elements';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './Styles/LogCardStyles';

const sections = [
  { title: 'Body Stats', icon: 'man', type: 'entypo' },
  { title: 'Workout', icon: 'dumbbell', type: 'material-community' },
  { title: 'Nutrition', icon: 'nutrition', type: 'material-community' },
];

const LogCard = () => (
  <View style={ styles.container }>
    {sections.map( ( { title, icon, type } ) => (
      <TouchableOpacity key={ title }>
        <Icon name={ icon } type={ type } color={ styles.$textColor } size={ 60 } />
        <Text style={ styles.sectionTitle }>{title}</Text>
      </TouchableOpacity>
    ) )}
  </View>
);

export default LogCard;
