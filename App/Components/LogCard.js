import React from 'react';
// import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Fonts } from '../Themes';
import styles from './Styles/LogCardStyles';

const sections = [
  { title: 'Body Stats', icon: 'man', type: 'entypo' },
  { title: 'Workout', icon: 'dumbbell', type: 'material-community' },
  { title: 'Nutrition', icon: 'nutrition', type: 'material-community' },
];

const LogCard = () => (
  <View style={ styles.container }>
    <Text style={ styles.logTitle }>{`  ${ new Date().toDateString() } `}</Text>
    {sections.map( ( { title, icon, type } ) => (
      <TouchableOpacity>
        <Icon name={ icon } type={ type } color={ styles.$textColor } size={ 60 } />
        <Text style={ styles.sectionTitle }>{title}</Text>
      </TouchableOpacity>
    ) )}
  </View>
);

// export default connect( ( { auth } ) => auth )( LogCard );
export default LogCard;
