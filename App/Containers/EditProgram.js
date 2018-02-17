/* eslint react/prop-types: 0 */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StatusBar, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../Components/Header';
import styles from './Styles/EditProgramStyles';
import * as Actions from '../Redux/Actions/Program';
import ActionButton from '../Components/ActionButton';
import { EditProgramCard } from '../Components/ProgramCard';

class EditProgram extends Component {
  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.navigation.state.key !== 'Programs') {
        this.props.goBack();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const {
      goBack,
      program: { showExercises },
      navigation: { state: { params: { edit, programId, item } } },
    } = this.props;
    const gradients = [styles.$primary, styles.$secondary, styles.$tertiary];
    return (
      <LinearGradient style={styles.container} colors={gradients}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <Header title="SwoleMate" />
        <EditProgramCard edit={edit} item={item} programId={programId} />
        <ActionButton buttons={getButtons(goBack)} />
      </LinearGradient>
    );
  }
}

const getButtons = goBack => [
  {
    icon: 'back',
    animation: 'zoomIn',
    onPress: () => goBack(),
  },
];

const mapStateToProps = state => ({
  program: state.program,
  programs: state.programs,
});

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.back('Programs')),
  toggleExercises: (bool, dayKey) => dispatch(Actions.toggleExercises(bool, dayKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProgram);
