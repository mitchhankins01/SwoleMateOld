import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import themeStyles from './styles';
import {
  fetchProgram,
  fetchAllPrograms,
  fetchAllExercises,
  updateScreenIndex,
  updateSelectedDayKey,
} from '../../actions/program_actions';

class Programs extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchProgram());
    dispatch(fetchAllPrograms());
    dispatch(fetchAllExercises());
  }

  updateScreenIndex(screenIndex, selectedDayKey, selectedProgram) {
    const { dispatch } = this.props;
    dispatch(updateScreenIndex(screenIndex));
    if (selectedDayKey) { dispatch(updateSelectedDayKey(selectedDayKey)); }
    if (selectedProgram) { dispatch(fetchProgram(selectedProgram)); }
  }

  renderAllPrograms = styles => {
    return (
      this.props.allPrograms.map(program => {
        const subtitle = `${program.frequency} Days - ${program.level} - ${program.type}`;
        return (
          <ListItem
            hideChevron
            key={program.key}
            subtitle={subtitle}
            title={program.name}
            underlayColor={'transparent'}
            containerStyle={styles.listItem}
            titleStyle={styles.listItemTitle}
            subtitleStyle={styles.listItemSubtitle}
            onPress={() => this.updateScreenIndex('selectedProgram', null, program.key)}
            leftIcon={<Entypo style={styles.listItemIcon} name={'clipboard'} size={30} />}
          />
        );
      })
    );
  }

  renderProgramDays = (styles, program) => {
    return (
      program.map(day => {
        const subtitle = `${day.primaryGroup} - ${day.secondaryGroup}`;
        return (
          <ListItem
            hideChevron
            key={day.key}
            title={day.name}
            subtitle={subtitle}
            underlayColor={'transparent'}
            containerStyle={styles.listItem}
            titleStyle={styles.listItemTitle}
            subtitleStyle={styles.listItemSubtitle}
            onPress={() => this.updateScreenIndex('programExercises', day.key)}
            leftIcon={<Entypo style={styles.listItemIcon} name={'folder'} size={30} />}
          />
        );
      })
    );
  }

  renderProgramExercises = (styles, exercises) => {
    return (
      exercises.map(exercise => {
        if (exercise.day === this.props.selectedDayKey) {
          const match = this.props.allExercises.find(eachExercise => {
            return eachExercise.key === exercise.exerciseKey;
          });

          const subtitle = `${exercise.sets} Sets - ${exercise.reps} Reps - ${exercise.rest}s Rest`;
          return (
            <ListItem
              hideChevron
              key={exercise.key}
              title={match.name}
              subtitle={subtitle}
              underlayColor={'transparent'}
              containerStyle={styles.listItem}
              titleStyle={styles.listItemTitle}
              subtitleStyle={styles.listItemSubtitle}
              leftIcon={<MaterialIcons style={styles.listItemIcon} name={'dumbbell'} size={30} />}
              onPress={() => {}}
            />
          );
        }
        return null;
      })
    );
  }

  render() {
    const { loading, screenIndex, theme } = this.props;
    const styles = themeStyles[theme];

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>SwoleMate</Text>
          <Text style={styles.loadingTextSub}>Loading...</Text>
          <ProgressBar width={200} indeterminate color={styles.$primaryColor} />
        </View>
      );
    }

    let renderType;
    switch (screenIndex) {
      default:
        return;
      case 'allPrograms':
        renderType = this.renderAllPrograms(styles);
        break;
      case 'primaryProgram':
      case 'selectedProgram':
        renderType = this.renderProgramDays(styles, this.props.programDays);
        break;
      case 'programExercises':
        renderType = this.renderProgramExercises(styles, this.props.programExercises);
        break;
      case 'addProgram':
      case 'addProgramDay':
      case 'addProgramExercise':
        return null;
    }

    return (
      <Animatable.View>
        {renderType}
      </Animatable.View>
    );
  }
}

const mapStateToProps = ({ program, theme }) => {
  return {
    // Various
    theme: theme.selected,
    loading: program.loading,
    editMode: program.editMode,
    screenIndex: program.screenIndex,
    selectedDayKey: program.selectedDayKey,
    // All Exercises
    allExercises: program.allExercises,
    // All Programs
    allPrograms: program.programs,
    // Primary or Selected Program
    programInfo: program.info,
    programDays: program.days,
    programExercises: program.exercises,
  };
};

export default connect(mapStateToProps)(Programs);
