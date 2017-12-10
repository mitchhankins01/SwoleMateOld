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
    loading: false,
    allPrograms: [],
    allExercises: [],
  }

  componentWillMount() {
    this.fetchProgram();
    this.fetchAllExercises();
    this.fetchAllPrograms();
  }

  // FETCHING FROM FB
  fetchProgram(selectedProgram) {
    this.setState({ loading: true });

    const info = [];
    const days = [];
    const exercises = [];

    // Get primaryProgram key and program details
    const uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(uid).get()
    .then(userDoc => {
      const program = selectedProgram || userDoc.data().primaryProgram;

      const programRef = firebase.firestore()
        .collection('userPrograms').doc(program);

      programRef.get()
      .then(thisProgram => {
        const { author, frequency, description, level, name, type } = thisProgram.data();
        info.push({ author, frequency, description, level, name, type, key: thisProgram.id });
        this.setState({ info });
      })
      .catch(error => {
        console.log(error);
      });

      programRef.collection('days').get()
      .then(querySnapshot => {
        querySnapshot.forEach(day => {
          const { author, description, key, name, primaryGroup, secondaryGroup } = day.data();
          days.push({ author, description, key, name, primaryGroup, secondaryGroup });
          this.setState({ days });
        });
      })
      .catch(error => {
        console.log(error);
      });

      programRef.collection('exercises').get()
      .then(querySnapshot => {
        querySnapshot.forEach(details => {
          const { author, day, exerciseKey, key, reps, rest, sets } = details.data();
          exercises.push({ author, day, exerciseKey, key, reps, rest, sets });
          this.setState({ exercises });
        });
      })
      .catch(error => {
        console.log(error);
      });

      this.setState({ loading: false });
    })
    .catch(error => {
      console.log(error);
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
    const uid = firebase.auth().currentUser.uid;

    firebase.firestore().collection('userPrograms').where('author', '==', uid)
    .get()
    .then(querySnapshot => {
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
      this.setState({ allPrograms });
    })
    .catch(error => {
      console.log(error);
    });
  }

  updateScreenIndex(screenIndex, selectedDayKey, selectedProgram) {
    const { dispatch } = this.props;

    if (screenIndex) dispatch(updateScreenIndex(screenIndex));
    if (selectedDayKey) dispatch(updateSelectedDayKey(selectedDayKey));
    if (selectedProgram) this.fetchProgram(selectedProgram);
  }

  renderAllPrograms = () => {
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
    return (
      this.state.days.map(day => {
        return (
          <Card
            item={day}
            key={day.key}
            icon={'folder'}
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
    console.log(this.state.loading);
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
    //loading: program.loading,
    screenIndex: program.screenIndex,
    selectedDayKey: program.selectedDayKey,
    // // All Exercises
    // allExercises: program.allExercises,
    // // All Programs
    // allPrograms: program.programs,
    // // Primary or Selected Program
    // programInfo: program.info,
    // programDays: program.days,
    // programExercises: program.exercises,
  };
};

export default connect(mapStateToProps)(Programs);
