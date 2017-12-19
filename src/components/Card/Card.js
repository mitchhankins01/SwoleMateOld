import { toJS } from 'mobx';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Icon } from 'react-native-elements';

import { Form } from '../Form';
import themeStyles from './styles';

@inject('themeStore', 'programStore', 'logStore') @observer
class Card extends Component {
  state = {
    warningVisible: false,
    selectedDeleteKey: '',
  }

  onPressDelete() {
    const { selectedDeleteKey } = this.state;
    const { programStore: {
      screenIndex, info, deleteProgram, deleteProgramDay, deleteProgramExercise
    } } = this.props;

    switch (screenIndex) {
      default: return;
      case 'allPrograms':
        return deleteProgram(selectedDeleteKey);
      case 'primaryProgram':
      case 'selectedProgram':
        return deleteProgramDay(info, selectedDeleteKey);
      case 'programExercises':
        return deleteProgramExercise(info, selectedDeleteKey);
    }
  }

  renderWarning(styles, key) {
    if (this.state.warningVisible && key === this.state.selectedDeleteKey) {
      return (
        <Animatable.View animation={'fadeIn'}>
          <View style={styles.cardDivider} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Entypo
              size={30}
              name={'cross'}
              style={styles.cardIcon}
              underlayColor={'transparent'}
              onPress={() => this.setState({ warningVisible: false })}
            />
            <Text style={styles.warningText}>
              Are you sure?
            </Text>
            <Entypo
              size={25}
              name={'check'}
              style={styles.cardIcon}
              underlayColor={'transparent'}
              onPress={() => this.onPressDelete()}
            />
          </View>
        </Animatable.View>
      );
    }
  }

  renderEmptyCard(styles, title) {
    return (
      <Animatable.View style={styles.cardContainer} duration={750} animation='zoomIn'>
        <View style={styles.cardDivider} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Entypo style={styles.cardTitle} name={'add-to-list'} />
          <Text style={styles.cardTitle}>
            {`Use the button below \nto add a new ${title}`}
          </Text>
        </View>
        <View style={styles.cardDivider} />
      </Animatable.View>
    );
  }

  renderAddCard(styles, typeAddCard) {
    const { info } = this.props;

    const getTitle = () => {
      switch (typeAddCard) {
        default: break;
        case 'addProgram': return 'Add Program';
        case 'addProgramDay': return 'Add Workout';
        case 'addProgramExercise': return 'Add Exercise';
      }
    };

    const getForm = () => {
      const { allExercises } = this.props;

      switch (typeAddCard) {
        default: break;
        case 'addProgram':
          return <Form info={info} formType='addProgram' />;
        case 'addProgramDay':
          return <Form info={info} formType='addProgramDay' />;
        case 'addProgramExercise':
          return <Form info={info} formType='addProgramExercise' allExercises={allExercises} />;
      }
    };

    return (
      <ScrollView>
        <View style={styles.cardContainer} >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Entypo style={styles.cardTitle} name={'add-to-list'} />
            <Text style={styles.cardTitle}>
              {getTitle()}
            </Text>
          </View>
          <View style={styles.cardDivider} />
          {getForm()}
        </View>
      </ScrollView>
    );
  }

  renderLogCard(styles) {
    const {
      isWorkout, isBodyStats, isNutrition, updateScreenIndex, workoutLogs, workoutLogsExercises
    } = this.props.logStore;

    if (this.props.workout) {
      const workoutLogsExercisesToJS = toJS(workoutLogsExercises);
      const timePassed = new Date(workoutLogs[0].timePassed * 1000).toISOString().substr(12, 7);

      const match = key => {
        return this.props.programStore.allExercises.find(each => {
          return each.key === key;
        });
      };

      return (
        <View style={styles.logCardContainer}>
          <Text style={styles.logTitle}>
            <MaterialIcons name='calendar' color='#EDF0F1' size={20} />
            {`  ${this.props.logStore.selectedDate}`}
          </Text>
          <View style={styles.cardDivider} />

          <Text style={styles.logTitle}>
            <MaterialIcons name='clock' color='#EDF0F1' size={20} />
            {'  Workout Duration'}
          </Text>
          <Text style={styles.logDetail}>{timePassed}</Text>
          <View style={styles.cardDivider} />

          <ScrollView>
            {workoutLogsExercisesToJS.map(each => {
              return (
                <View key={each.exerciseKey} style={{ justifyContent: 'flex-start', margin: 5 }}>
                  <Text style={styles.logTitle}>
                    <MaterialIcons name='dumbbell' color='#EDF0F1' size={20} />
                    {`  ${match(each.exerciseKey).name}`}
                  </Text>
                  {each.completedSets.map((set, index) => {
                    return (<Text key={index} style={styles.logDetail}>
                      {`Set: ${set.set} ${set.reps}x${set.weight} `}
                    </Text>);
                  })}
                </View>
              );
            })}
          </ScrollView>
          <Icon
            name='back'
            type='entypo'
            iconStyle={{
              paddingTop: 5,
              //marginBottom: -10,
              color: '#EDF0F1',
              paddingHorizontal: 30,
            }}
            underlayColor='transparent'
            onPress={() => updateScreenIndex('logOverview')}
          />
        </View>
      );
    }

    return (
      <View style={styles.logCardContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <MaterialIcons style={styles.cardTitle} name='calendar' />
          <Text style={styles.cardTitle}>{this.props.logStore.selectedDate}</Text>
        </View>
        <View style={styles.cardDivider} />
        <TouchableOpacity onPress={() => updateScreenIndex('bodyStats')} activeOpacity={isBodyStats('bg')}>
          <Icon name='man' type='entypo' color={isBodyStats()} size={60} />
          <Text style={[styles.cardTitle, { color: isBodyStats() }]}>Body Stats</Text>
        </TouchableOpacity>
        <View style={styles.cardDivider} />
        <TouchableOpacity onPress={() => updateScreenIndex('workout')} activeOpacity={isWorkout('bg')}>
          <Icon name='dumbbell' type='material-community' color={isWorkout()} size={60} />
          <Text style={[styles.cardTitle, { color: isWorkout() }]}>Workout Log</Text>
        </TouchableOpacity>
        <View style={styles.cardDivider} />
        <TouchableOpacity onPress={() => updateScreenIndex('nutrition')} activeOpacity={isNutrition('bg')}>
          <Icon name='nutrition' type='material-community' color={isNutrition()} size={60} />
          <Text style={[styles.cardTitle, { color: isNutrition() }]}>Nutrition Log</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {
      // Empty Card
      empty,
      title,
      // New Card
      addCard,
      typeAddCard,
      // Existing Program Card
      item,
      subtitle,
      icon,
      onPress,
      // Log
      logCard,
    } = this.props;
    const styles = themeStyles[this.props.themeStore.selected];

    if (empty) return this.renderEmptyCard(styles, title);
    if (addCard) return this.renderAddCard(styles, typeAddCard);
    if (logCard) return this.renderLogCard(styles);

    return (
      <Animatable.View style={styles.cardContainer} duration={750} animation='zoomIn'>
        <TouchableOpacity key={item.name} onPress={onPress} >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <MaterialIcons style={styles.cardTitle} name={icon} />
            <Text style={styles.cardTitle}>
              {item.name}
            </Text>
          </View>
          <View style={styles.cardDivider} />
          <Text style={styles.cardSubtitle}>
            {subtitle}
          </Text>
          {this.renderWarning(styles, item.key)}
          <View style={styles.cardDivider} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Entypo
            size={25}
            name={'edit'}
            style={styles.cardIcon}
            underlayColor={'transparent'}
            onPress={() => console.log(item)}
          />
          <Entypo
            ref='deleteButton'
            size={22}
            name={'trash'}
            style={styles.cardIcon}
            underlayColor={'transparent'}
            onPress={() => this.setState({
              warningVisible: !this.state.warningVisible,
              selectedDeleteKey: item.key
            })}
          />
        </View>
      </Animatable.View>
    );
  }
}

export default Card;
