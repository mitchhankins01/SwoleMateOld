import { connect } from 'react-redux';
import React, { Component } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import { View, Text, TouchableOpacity } from 'react-native';
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
  state = {
    selectedDeleteKey: '',
    warningVisible: false
  }

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

  renderWarning(styles, key) {
    if (this.state.warningVisible && key === this.state.selectedDeleteKey) {
      return (
        <Animatable.View animation={'fadeIn'}>
          <View style={styles.programDivider} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Entypo
              size={30}
              name={'cross'}
              style={styles.programIcon}
              underlayColor={'transparent'}
              onPress={() => this.setState({ warningVisible: false })}
            />
            <Text style={styles.warningText}>
              Are you sure?
            </Text>
            <Entypo
              size={25}
              name={'check'}
              style={styles.programIcon}
              underlayColor={'transparent'}
              onPress={() => this.showPopover}
            />
          </View>
        </Animatable.View>
      );
    }
  }

  renderCard(styles, item, subtitle, icon, onPress) {
    return (
      <TouchableOpacity key={item.name} style={styles.programContainer} onPress={onPress} >
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <MaterialIcons style={styles.programTitle} name={icon} />
          <Text style={styles.programTitle}>
            {item.name}
          </Text>
        </View>
        <View style={styles.programDivider} />
        <Text style={styles.programSubtitle}>
          {subtitle}
        </Text>
        <View style={styles.programDivider} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Entypo
            size={25}
            name={'edit'}
            style={styles.programIcon}
            underlayColor={'transparent'}
            onPress={() => this.showPopover}
          />
          <Entypo
            ref='deleteButton'
            size={22}
            name={'trash'}
            style={styles.programIcon}
            underlayColor={'transparent'}
            onPress={() => this.setState({ warningVisible: true, selectedDeleteKey: item.key })}
          />
        </View>
        {this.renderWarning(styles, item.key)}
      </TouchableOpacity>
    );
  }

  renderAllPrograms = styles => {
    return (
      this.props.allPrograms.map(program => {
        const subtitle = `${program.frequency} Days - ${program.level} - ${program.type}`;
        return this.renderCard(styles, program, subtitle, 'clipboard',
          () => this.updateScreenIndex('selectedProgram', null, program.key));
      })
    );
  }

  renderProgramDays = (styles, program) => {
    return (
      program.map(day => {
        const subtitle = `${day.primaryGroup} - ${day.secondaryGroup}`;
        return this.renderCard(styles, day, subtitle, 'folder',
          () => this.updateScreenIndex('programExercises', day.key));
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

          return this.renderCard(styles, match, subtitle, 'dumbbell',
            () => this.updateScreenIndex('programExercises'));
        }
        return null;
      })
    );
  }

  render() {
    const { loading, screenIndex, theme } = this.props;
    const styles = themeStyles[theme];

    // if (loading) {
    //   return (
    //     <View style={styles.loadingContainer}>
    //       <Text style={styles.loadingText}>SwoleMate</Text>
    //       <Text style={styles.loadingTextSub}>Loading...</Text>
    //       <ProgressBar width={200} indeterminate color={styles.$primaryColor} />
    //     </View>
    //   );
    // }

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
