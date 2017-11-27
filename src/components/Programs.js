import { Text } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { ListItem } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { fetchAllPrograms, updateScreenIndex } from '../actions/program_actions';

class Programs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primaryProgram: {},
      selectedDayKey: '',
      exercises: [],
      loading: true,
      programs: [],
      days: [],
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchAllPrograms());
  }

  componentWillUpdate() {
    const { renderView } = this.refs;

    if (renderView) {
      renderView.flipInY();
    }
  }

  updateScreenIndex(index) {
    const { dispatch } = this.props;
    dispatch(updateScreenIndex(index));
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
      this.state.days.map(day => {
        return (
          <ListItem
            hideChevron
            key={day.key}
            title={day.name}
            underlayColor={'transparent'}
            containerStyle={styles.listItem}
            titleStyle={styles.listItemProgramsTitle}
            onPress={() => this.updateScreenIndex('primaryProgramDetails')}
            //onPress={() => this.updateScreen(0, day.key)}
            leftIcon={<Entypo style={styles.listItemIcon} name={'folder'} size={30} />}
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
              onPress={() => {}}
            />
          );
        }
        return null;
      })
    );
  }

  render() {
    const { styles, screenIndex } = this.props;

    // IMPLEMENT is not working correctly
    if (this.state.loading) { return <Text> Loading </Text>; }

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
    screenIndex: state.program.screenIndex,
  };
};

export default connect(mapStateToProps)(Programs);
