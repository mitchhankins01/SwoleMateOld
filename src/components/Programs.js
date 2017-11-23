import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListItem, Button } from 'react-native-elements';

class Programs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primaryProgram: {},
      selectedDayKey: '',
      screenIndex: -1,
      exercises: [],
      loading: true,
      programs: [],
      days: [],
    };
  }

  componentWillMount() {
    const uid = firebase.auth().currentUser.uid;

    firebase.firestore().collection('users').doc(uid)
     .onSnapshot(userDoc => {
       this.fetchPrimaryProgram(userDoc.data().primaryProgram);
     });

    this.fetchAllPrograms(uid);
  }

  fetchAllPrograms(uid) {
    const programs = [];

    firebase.firestore().collection('userPrograms').where('author', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(program => {
        const {
          author, days, description, level, name, type
        } = program.data();

        programs.push({
          key: program.id,
          program, // DocumentSnapshot
          author,
          days,
          description,
          level,
          name,
          type
        });
      });
    });

    this.setState({
      programs,
    });
  }

  fetchPrimaryProgram(primaryProgramKey) {
    const days = [];
    const exercises = [];
    const primaryProgramRef =
      firebase.firestore().collection('userPrograms').doc(primaryProgramKey);

    primaryProgramRef.get()
    .then(primaryProgram => {
      this.setState({ primaryProgram: primaryProgram.data() });
    });

    primaryProgramRef.collection('days').get()
      .then(querySnapshot => {
        querySnapshot.forEach(day => {
          const { key, name } = day.data();
          days.push({ key, name });
        });
      });

    primaryProgramRef.collection('exercises').get()
      .then(querySnapshot => {
        querySnapshot.forEach(details => {
          const { day, name, sets, reps, rest } = details.data();
          exercises.push({ key: details.id, day, name, sets, reps, rest });
        });
      });

    this.setState({
      days,
      exercises,
      loading: false
    });
  }

  renderAllPrograms = styles => {

  }

  renderPrimaryProgram = styles => {
    return (
      this.state.days.map(day => {
        return (
          <ListItem
            hideChevron
            key={day.key}
            title={day.name}
            underlayColor={'transparent'}
            containerStyle={styles.listItem}
            titleStyle={styles.listItemProgramsTitle}
            subtitleStyle={styles.listItemProgramsSubtitle}
            leftIcon={<Entypo style={styles.listItemIcon} name={'calendar'} size={30} />}
            onPress={() => this.setState({ screenIndex: 0, selectedDayKey: day.key })}//onPress(i)}
          />
        );
      })
    );
  }

  renderPrimaryProgramDetails = styles => {
    return (
      this.state.exercises.map(exercise => {
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
              onPress={() => {}}//onPress(i)}
            />
          );
        }
        return null;
      })
    );
  }

  render() {
    const { styles, type } = this.props;

    if (this.state.loading) {
      return <Text> Loading </Text>;
    }

    switch (this.state.screenIndex) {
      case 0:
        return this.renderPrimaryProgramDetails(styles);
      default:
        return this.renderPrimaryProgram(styles);
    }
    // return this.renderContent(
    //   styles,
    //   this.state.days,
    //   80,
    //   false,
    //   () => {},
    // );
  }
}

export default Programs;
