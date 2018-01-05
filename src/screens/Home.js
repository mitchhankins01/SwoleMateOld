import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { BackHandler, StatusBar } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Initialize animations
import Animations from '../components/Animations';

import { Alert } from '../components/Alert';
import Header from '../components/Header';
import Greeting from '../components/Greeting';
import themeStyles from '../components/styles';
import { Programs } from '../components/Programs';
import { ButtonGroup } from '../components/ButtonGroup';
import { ActionButton } from '../components/ActionButton';

@inject('userStore', 'programStore') @observer
class Home extends Component {

   static navigationOptions = {
     drawerLabel: 'Home',
     drawerIcon: ({ tintColor, focused }) => (
       <Ionicons
         name={focused ? 'ios-home' : 'ios-home-outline'}
         size={26}
         style={{ color: tintColor }}
       />
     ),
   };

   state = { scrollIndex: 0 }

   componentWillMount() {
     const {
       programStore: {
         getScreenIndex,
         fetchAllPrograms,
         getShowUpdateForm,
         updateScreenIndex,
         fetchAllExercises,
         fetchPrimaryProgram,
         toggleShowUpdateForm,
       },
       userStore,
       navigation
     } = this.props;

     userStore.fetchTheme();
     fetchAllPrograms();
     fetchAllExercises();
     fetchPrimaryProgram();
     // programStore.addExercises();

     this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
       if (getShowUpdateForm()) {
         toggleShowUpdateForm(false);
         return true;
       }
       if (navigation.state.routeName === 'Home' && getScreenIndex() !== 'primaryProgram') {
         updateScreenIndex('primaryProgram');
         return true;
       }
       return false;
     });
   }

   componentDidUpdate() {
     const { titleView } = this.refs;
     if (titleView) { titleView.zoomIn(); }
   }

    componentWillUnmount() {
      this.backHandler.remove();
    }

   renderTitle() {
     const { days, info, screenIndex, selectedDayKey } = this.props.programStore;

     switch (screenIndex) {
       default: return 'SwoleMate';
       case 'allPrograms': return 'All Programs';
       case 'primaryProgram':
       case 'selectedProgram': return info.map(detail => detail.name);
       case 'programExercises':
         return days.filter(day => day.key === selectedDayKey).map(detail => detail.name);
       case 'updateProgram': return 'Edit Program';
       case 'updateProgramDay': return 'Edit Workout';
       case 'updateProgramExercise': return 'Edit Exercise';
     }
   }

  render() {
    const styles = themeStyles[this.props.userStore.selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];
    const { error } = this.props.programStore;
    // if (this.props.programStore.loading) {
    //   this.dropdown.alertWithType('info', "I'll be back", "We're Loading");
    // }

    return (
      <LinearGradient colors={gradients} style={styles.homeContainer} >
        <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
        <Header
          styles={styles}
          navigation={this.props.navigation}
          title={this.renderTitle().toString().substring(0, 30)}
        />

        {/* <Greeting styles={styles} /> */}
        {error ? <Alert acknowledge title='Whoops' message={error} /> : null}

        <ButtonGroup />

        <Programs navigation={this.props.navigation} />

        <ActionButton navigation={this.props.navigation} />

        <DropdownAlert
          translucent
          zIndex={100}
          closeInterval={2000}
          updateStatusBar={false}
          infoColor={styles.$tertiaryColor}
          titleStyle={styles.dropdownTitle}
          ref={ref => (this.dropdown = ref)}
          messageStyle={styles.dropdownMessage}
          onClose={() => this.props.programStore.resetError()}
        />

      </LinearGradient>
    );
  }
}

export default Home;
