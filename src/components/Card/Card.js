import { connect } from 'react-redux';
import React, { Component } from 'react';
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
} from '../../actions/program_actions';

class Card extends Component {
  state = {
    warningVisible: false,
    selectedDeleteKey: '',
  }

  onPressDelete() {
    const { selectedDeleteKey } = this.state;
    const { dispatch, screenIndex, programInfo } = this.props;
    switch (screenIndex) {
      default: return;
      case 'allPrograms':
        return dispatch(deleteProgram(selectedDeleteKey));
      case 'primaryProgram':
      case 'selectedProgram':
        return dispatch(deleteProgramDay(programInfo, selectedDeleteKey));
      case 'programExercises':
        return dispatch(deleteProgramExercise(programInfo, selectedDeleteKey));
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Entypo style={styles.cardTitle} name={'add-to-list'} />
          <Text style={styles.cardTitle}>
            {`Use the buttons below to add a new ${title}`}
          </Text>
        </View>
        <View style={styles.cardDivider} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Entypo
            size={25}
            name={'edit'}
            style={styles.cardIcon}
            underlayColor={'transparent'}
            onPress={() => this.showPopover}
          />
        </View>
      </Animatable.View>
    );
  }

  renderAddCard(styles, typeAddCard) {
    const getTitle = () => {
      switch (typeAddCard) {
        default: break;
        case 'addProgram': return 'Add Program';
        case 'addProgramDay': return 'Add Workout';
        case 'addProgramExercise': return 'Add Exercise';
      }
    };

    const getForm = () => {
      switch (typeAddCard) {
        default: break;
        case 'addProgram': return <Form formType='addProgram' />;
        case 'addProgramDay': return <Form formType='addProgramDay' />;
        case 'addProgramExercise': return <Form formType='addProgramExercise' />;
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

  render() {
    const {
      // Various
      theme,
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
      onPress
    } = this.props;
    const styles = themeStyles[theme];

    if (empty) return this.renderEmptyCard(styles, title);
    if (addCard) return this.renderAddCard(styles, typeAddCard);

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
            onPress={() => this.showPopover}
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

const mapStateToProps = ({ program, theme }) => {
  return {
    theme: theme.selected,
    programInfo: program.info,
    screenIndex: program.screenIndex,
  };
};

export default connect(mapStateToProps)(Card);
