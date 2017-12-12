import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Form } from '../Form';
import themeStyles from './styles';

import {
  deleteProgram,
  deleteProgramDay,
  deleteProgramExercise,
} from '../../actions/programActions';

@inject('themeStore', 'programStore') @observer
class Card extends Component {
  state = {
    warningVisible: false,
    selectedDeleteKey: '',
  }

  onPressDelete() {
    const { selectedDeleteKey } = this.state;
    const { dispatch, screenIndex, info } = this.props;
    switch (screenIndex) {
      default: return;
      case 'allPrograms':
        return dispatch(deleteProgram(selectedDeleteKey));
      case 'primaryProgram':
      case 'selectedProgram':
        return dispatch(deleteProgramDay(info, selectedDeleteKey));
      case 'programExercises':
        return dispatch(deleteProgramExercise(info, selectedDeleteKey));
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

  renderCard(styles) {
    return (
      <Animatable.View style={styles.cardContainer} duration={750} animation='zoomIn'>
        {this.props.children}
      </Animatable.View>
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

      // Reusable testing
      reusable
    } = this.props;
    const styles = themeStyles[this.props.themeStore.selected];

    if (empty) return this.renderEmptyCard(styles, title);
    if (addCard) return this.renderAddCard(styles, typeAddCard);
    if (reusable) return this.renderCard(styles);

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
