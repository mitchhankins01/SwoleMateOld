import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { BackHandler, StatusBar } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Initialize animations
import Animations from '../components/Animations';

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
         updateScreenIndex,
         fetchAllExercises,
         fetchPrimaryProgram,
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

   renderError() {
     if (this.props.programStore.error !== '') {
       this.dropdown.alertWithType('info', 'Whoops', this.props.programStore.error);
     }
   }

   renderCloseAlert() {
     this.dropdownExit.alertWithType('info', 'Exit', 'Tap this close button to exit');
   }

   renderTitle() {
     const { days, info, screenIndex, selectedDayKey } = this.props.programStore;

     if (screenIndex === 'primaryProgram' || screenIndex === 'selectedProgram') {
       return info.map(detail => detail.name);
     } else if (screenIndex === 'programExercises') {
       return days.filter(day => day.key === selectedDayKey).map(detail => detail.name);
     } else if (screenIndex === 'allPrograms') {
       return 'All Programs';
     } return 'Update';
   }

  render() {
    const styles = themeStyles[this.props.userStore.selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

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

        <ButtonGroup />

        <Programs navigation={this.props.navigation} />

        {this.renderError()}

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

        <DropdownAlert
          showCancel
          translucent
          zIndex={100}
          updateStatusBar={false}
          infoColor={styles.$tertiaryColor}
          ref={ref => (this.dropdownExit = ref)}
          onCancel={() => this.props.navigation.goBack(null)}
          titleStyle={[styles.dropdownTitle, { marginLeft: 0 }]}
          messageStyle={[styles.dropdownMessage, { marginLeft: 0 }]}
        />
      </LinearGradient>
    );
  }
}

export default Home;
