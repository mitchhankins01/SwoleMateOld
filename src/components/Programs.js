import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { ListItem } from 'react-native-elements';
import ProgressBar from 'react-native-progress/Bar';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  fetchAllPrograms,
  fetchPrimaryProgram,
  updateScreenIndex
} from '../actions/program_actions';

class Programs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Primary Program
      days: [],
      info: [],
      exercises: [],
      selectedDayKey: '',
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllPrograms());
    dispatch(fetchPrimaryProgram('1lpxLYtOGcayIWh5QJlN'));
  }

  componentWillUpdate() {
    const { renderView } = this.refs;

    if (renderView) {
      renderView.flipInY();
    }
  }

  updateScreenIndex(index, selectedDayKey) {
    const { dispatch } = this.props;
    dispatch(updateScreenIndex(index));
    if (selectedDayKey) { this.setState({ selectedDayKey }); }
  }

  renderAllPrograms = styles => {
    return (
      this.props.allPrograms.map(program => {
        const subtitle = `${program.frequency} Days - ${program.level} - ${program.type}`;

        return (
          <ListItem
            hideChevron
            key={program.name}
            subtitle={subtitle}
            title={program.name}
            underlayColor={'transparent'}
            containerStyle={styles.listItem}
            titleStyle={styles.listItemProgramsTitle}
            subtitleStyle={styles.listItemProgramsSubtitle}
            leftIcon={<Entypo style={styles.listItemIcon} name={'clipboard'} size={30} />}
            onPress={() => this.updateScreenIndex('allProgramsDetails')}
          />
        );
      })
    );
  }

  renderAllProgramsDetails = styles => {
    return (
      <Text> Details </Text>
    );
  }

  renderPrimaryProgram = styles => {
    return (
      this.props.programDays.map(day => {
        return (
          <ListItem
            hideChevron
            key={day.key}
            title={day.name}
            underlayColor={'transparent'}
            containerStyle={styles.listItem}
            titleStyle={styles.listItemProgramsTitle}
            onPress={() => this.updateScreenIndex('primaryProgramDetails', day.key)}
            leftIcon={<Entypo style={styles.listItemIcon} name={'folder'} size={30} />}
          />
        );
      })
    );
  }

  renderPrimaryProgramDetails = styles => {
    return (
      this.props.programExercises.map(exercise => {
        console.log(exercise);
        if (exercise.day === this.state.selectedDayKey) {
          const subtitle = `${exercise.sets} Sets - ${exercise.reps} Reps - ${exercise.rest}s Rest`;
          return (
            <ListItem
              hideChevron
              key={exercise.key}
              subtitle={subtitle}
              title={exercise.name}
              underlayColor={'transparent'}
              containerStyle={styles.listItem}
              titleStyle={styles.listItemProgramsTitle}
              subtitleStyle={styles.listItemProgramsSubtitle}
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
    const { loading, styles, screenIndex } = this.props;

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
      case 'allProgramsDetails':
        renderType = this.renderAllProgramsDetails(styles);
        break;
      case 'primaryProgram':
        renderType = this.renderPrimaryProgram(styles);
        break;
      case 'primaryProgramDetails':
        renderType = this.renderPrimaryProgramDetails(styles);
        break;
    }

    return (
      <Animatable.View ref='renderView' animation='flipInY' duration={500}>
        {renderType}
      </Animatable.View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.program.loading,
    programInfo: state.program.info,
    programDays: state.program.days,
    allPrograms: state.program.programs,
    screenIndex: state.program.screenIndex,
    programExercises: state.program.exercises,
  };
};

export default connect(mapStateToProps)(Programs);
