import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';

import { Card } from '../Card';
import {
  updateScreenIndex,
  updateSelectedDayKey,
} from '../../actions/programActions';

class Programs extends Component {
  state = {
    // Primary or Selected Program
    info: [],
    days: [],
    exercises: [],
    // Various
    error: '',
    loading: false,
    allPrograms: [],
    allExercises: [],
  }

  componentWillMount() {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot(userDoc => {
      this.fetchProgram(userDoc.data().primaryProgram);
    });

    this.fetchAllExercises();
    this.fetchAllPrograms();
  }

  // FETCHING FROM FB
  fetchProgram(program) {
    const programRef = firebase.firestore().collection('userPrograms').doc(program);

    // Get program info
    const info = [];

    programRef.onSnapshot(thisProgram => {
      this.setState({ loading: true });
      info.length = 0;
      const { author, frequency, description, level, name, type } = thisProgram.data();
      info.push({ author, frequency, description, level, name, type, key: thisProgram.id });
      this.setState({ info, loading: false });
    });

    // Get program days
    const days = [];

    programRef.collection('days').onSnapshot(querySnapshot => {
      days.length = 0;
      this.setState({ loading: true });
      querySnapshot.forEach(day => {
        const { author, description, key, name, primaryGroup, secondaryGroup } = day.data();
        days.push({ author, description, key, name, primaryGroup, secondaryGroup });
      });
      this.setState({ days, loading: false });
    });

    // Get program exercises
    const exercises = [];

    programRef.collection('exercises').onSnapshot(querySnapshot => {
      exercises.length = 0;
      this.setState({ loading: true });
      querySnapshot.forEach(exercise => {
        const { author, day, exerciseKey, key, reps, rest, sets } = exercise.data();
        exercises.push({ author, day, exerciseKey, key, reps, rest, sets });
      });
      this.setState({ exercises, loading: false });
    });
  }

  fetchAllExercises() {
    const allExercises = [];

    firebase.firestore().collection('exercises')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(exercise => {
        const { description, group, key, name } = exercise.data();
        allExercises.push({ key, name, group, description });
      });
      this.setState({ allExercises });
    })
    .catch(error => {
      // IMPLEMENT, error is not coming through
      console.log(error);
    });
  }

  fetchAllPrograms() {
    const allPrograms = [];

    const allProgramsRef = firebase.firestore().collection('userPrograms')
      .where('author', '==', firebase.auth().currentUser.uid);

    allProgramsRef.onSnapshot(querySnapshot => {
      allPrograms.length = 0;
      this.setState({ loading: true });
      querySnapshot.forEach(program => {
        const {
          author, frequency, description, level, name, type
        } = program.data();

        allPrograms.push({
          type,
          name,
          level,
          author,
          program,
          frequency,
          description,
          key: program.id,
        });
      });
      this.setState({ allPrograms, loading: false });
    });
  }

  updateScreenIndex(screenIndex, selectedDayKey, selectedProgram) {
    const { dispatch } = this.props;

    if (screenIndex) dispatch(updateScreenIndex(screenIndex));
    if (selectedDayKey) dispatch(updateSelectedDayKey(selectedDayKey));
    if (selectedProgram) this.fetchProgram(selectedProgram);
  }

  renderAllPrograms = () => {
    if (this.state.allPrograms.length === 0) return <Card empty title='Program' />;

    return (
      this.state.allPrograms.map(program => {
        return (
          <Card
            item={program}
            key={program.key}
            icon={'clipboard'}
            subtitle={`${program.frequency} Days - ${program.level} - ${program.type}`}
            onPress={() => this.updateScreenIndex('selectedProgram', null, program.key)}
          />
        );
      })
    );
  }

  renderProgramDays = () => {
    if (this.state.days.length === 0) return <Card empty title='Workout' />;

    return (
      this.state.days.map(day => {
        return (
          <Card
            item={day}
            key={day.key}
            icon={'folder'}
            info={this.state.info}
            subtitle={`${day.primaryGroup} - ${day.secondaryGroup}`}
            onPress={() => this.updateScreenIndex('programExercises', day.key)}
          />
        );
      })
    );
  }

  renderProgramExercises = () => {
    return (
      this.state.exercises.map(exercise => {
        if (exercise.day === this.props.selectedDayKey) {
          const match = this.state.allExercises.find(eachExercise => {
            return eachExercise.key === exercise.exerciseKey;
          });
          // Modify match with actual exercise key, to facilitate deleting form program
          const item = Object.assign({}, match, { key: exercise.key });
          return (
            <Card
              item={item}
              key={item.key}
              icon={'folder'}
              info={this.state.info}
              onPress={() => this.updateScreenIndex('programExercises')}
              subtitle={`${exercise.sets} Sets - ${exercise.reps} Reps - ${exercise.rest}s Rest`}
            />
          );
        }
        return null;
      })
    );
  }

  render() {
    const { screenIndex } = this.props;
    // if (loading) {
    //   return (
    //     <View style={styles.loadingContainer}>
    //       <Text style={styles.loadingText}>SwoleMate</Text>
    //       <Text style={styles.loadingTextSub}>Loading...</Text>
    //       <ProgressBar width={200} indeterminate color={styles.$primaryColor} />
    //     </View>
    //   );
    // }

    if (this.state.loading) return null;

    let renderType;
    switch (screenIndex) {
      default:
        return null;
      case 'allPrograms':
        renderType = this.renderAllPrograms();
        break;
      case 'primaryProgram':
      case 'selectedProgram':
        renderType = this.renderProgramDays();
        break;
      case 'programExercises':
        renderType = this.renderProgramExercises(this.props.programExercises);
        break;
      case 'addProgram':
        renderType = <Card addCard typeAddCard='addProgram' info={this.state.info} />;
        break;
      case 'addProgramDay':
        renderType = <Card addCard typeAddCard='addProgramDay' info={this.state.info} />;
        break;
      case 'addProgramExercise':
        renderType = (
          <Card
            addCard
            info={this.state.info}
            typeAddCard='addProgramExercise'
            allExercises={this.state.allExercises}
          />
        );
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
    screenIndex: program.screenIndex,
    selectedDayKey: program.selectedDayKey,
  };
};

export default connect(mapStateToProps)(Programs);
