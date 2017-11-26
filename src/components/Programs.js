import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'react-native-firebase';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

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

  componentWillUpdate() {
    const { renderView } = this.refs;

    if (renderView) {
      renderView.flipInY();
    }
  }

  fetchAllPrograms(uid) {
    const programs = [];

    firebase.firestore().collection('userProgramsTest').where('author', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(program => {
        const {
          author, frequency, description, level, name, type
        } = program.data();

        programs.push({
          key: program.id,
          program, // DocumentSnapshot
          author,
          frequency,
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
    const primaryProgramRef = firebase.firestore()
      .collection('userPrograms').doc(primaryProgramKey);

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

  updateScreen(index, key) {
    switch (index) {
      default:
        this.setState({ screenIndex: -1 });
        break;
      case 0:
        this.props.onPressPrimaryProgramDetails();
        this.setState({ screenIndex: 0, selectedDayKey: key });
        break;
      case 1:
        this.props.onPressAllProgramsDetails();
        this.setState({ screenIndex: 1 });
        break;
    }
  }

  renderAllPrograms = styles => {
    return (
      this.state.programs.map(program => {
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
            onPress={() => this.updateScreen(1)}
          />
        );
      })
    );
  }

  renderAllProgramsDetails = styles => {
    if (this.props.type === 'primaryProgram') {
      //return this.renderPrimaryProgram(this.props.styles);
      return this.updateScreen(-1);
    }
    return (
      <Text> Details </Text>
    );
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
            onPress={() => this.updateScreen(0, day.key)}
            leftIcon={<Entypo style={styles.listItemIcon} name={'folder'} size={30} />}
          />
        );
      })
    );
  }

  renderPrimaryProgramDetails = styles => {
    if (this.props.type === 'primaryProgram') {
      //return this.renderPrimaryProgram(this.props.styles);
      return this.updateScreen(-1);
    }

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
              onPress={() => {}}
            />
          );
        }
        return null;
      })
    );
  }

  render() {
    const { styles, type, showAllPrograms } = this.props;

    if (this.state.loading) { return <Text> Loading </Text>; }

    let renderType;
    switch (this.state.screenIndex) {
      default:
        renderType = this.renderPrimaryProgram(styles);
        break;
      case 0:
        renderType = this.renderPrimaryProgramDetails(styles);
        break;
      case 1:
        renderType = this.renderAllProgramsDetails(styles);
        break;
    }

    if (showAllPrograms) {
      renderType = this.renderAllPrograms(styles);
    }

    return (
      <Animatable.View ref='renderView' animation='flipInY' duration={500}>
        {renderType}
      </Animatable.View>
    );
  }
}

export default Programs;
