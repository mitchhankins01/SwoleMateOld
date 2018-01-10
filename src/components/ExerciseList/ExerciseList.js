import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-native-elements';
import { FlatList, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import themeStyles from './styles';

const getName = (allExercises, ex) => {
  return allExercises.find(q => q.key === ex.exerciseKey).name;
};

export default inject('workoutStore', 'userStore')(observer((props) => {
  const styles = themeStyles[props.userStore.selected];
  const {
    exerciseList, allExercises, toggleExerciseList, updateExerciseIndex, loadExercise
  } = props.workoutStore;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Jump to Exercise</Text>
      <FlatList
        data={exerciseList}
        renderItem={({ item, index }) => {
          return (
            <Animatable.View delay={index * 150} key={item.key} animation='zoomIn'>
              <Button
                fontSize={20}
                fontFamily='Exo-Medium'
                title={getName(allExercises, item)}
                icon={{ name: 'dumbbell', type: 'material-community' }}
                buttonStyle={{ backgroundColor: 'transparent', padding: 15 }}
                onPress={() => {
                  updateExerciseIndex(item.index);
                  loadExercise();
                  toggleExerciseList(false);
                }}
              />
            </Animatable.View>
          );
        }}
      />
      <Button
        title='Close'
        fontSize={20}
        fontFamily='Exo-Medium'
        containerViewStyle={{ marginBottom: 10 }}
        onPress={() => toggleExerciseList(false)}
        buttonStyle={{ backgroundColor: 'transparent', padding: 15 }}
        icon={{ name: 'close', type: 'material-community', size: 22 }}
      />
    </View>
  );
}));
