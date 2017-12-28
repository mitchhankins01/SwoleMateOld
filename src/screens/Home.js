import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ScrollView, StatusBar } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Animations from '../components/Animations';
import Header from '../components/Header';
import Greeting from '../components/Greeting';
import themeStyles from '../components/styles';
import { Programs } from '../components/Programs';
import { ActionBar } from '../components/ActionBar';

@inject('userStore', 'programStore') @observer
class Home extends Component {

   static navigationOptions = {
     tabBarLabel: 'Home',
     tabBarIcon: ({ tintColor, focused }) => (
       <Ionicons
         name={focused ? 'ios-home' : 'ios-home-outline'}
         size={26}
         style={{ color: tintColor }}
       />
     ),
   };

   state = { scrollIndex: 0 }

   componentWillMount() {
     const { programStore, userStore } = this.props;

     userStore.fetchTheme();
     programStore.fetchAllPrograms();
     programStore.fetchAllExercises();
     programStore.fetchPrimaryProgram();
     // programStore.addExercises();
   }

   componentWillUpdate() {
     const { titleView } = this.refs;
     if (titleView) { titleView.zoomIn(); }
   }

   renderError() {
     if (this.props.programStore.error !== '') {
       this.dropdown.alertWithType('info', 'Whoops', this.props.programStore.error);
     }
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
        <Header title={this.renderTitle().toString().substring(0, 30)} styles={styles} />
{console.log(this.props.programStore.error)}
        <Greeting styles={styles} />

        <Programs navigation={this.props.navigation} />

        <ActionBar scrollIndex={this.state.scrollIndex} navigation={this.props.navigation} />

        {this.renderError()}

        <DropdownAlert
          translucent
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
