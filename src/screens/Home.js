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

@inject('themeStore', 'programStore') @observer
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
     const { programStore, themeStore } = this.props;

     themeStore.fetchTheme();
     programStore.fetchAllPrograms();
     programStore.fetchAllExercises();
     programStore.fetchPrimaryProgram();
   }

   componentDidMount() {
     /* Check for error from loading FB Programs */
     this.renderError(this.props.programError);
   }

   componentWillReceiveProps(nextProps) {
     // Reset scrollIndex due to navigation
     if (nextProps.screenIndex !== this.props.updateScreenIndex) {
       this.setState({ scrollIndex: 0 });
     }
   }

   componentWillUpdate() {
     const { titleView } = this.refs;
     if (titleView) { titleView.zoomIn(); }
   }

   renderError(error) {
     if (error) { this.dropdown.alertWithType('error', 'Something went wrong', error); }
   }

   renderTitle() {
     const { days, info, screenIndex, selectedDayKey } = this.props.programStore;

     if (screenIndex === 'primaryProgram' || screenIndex === 'selectedProgram') {
       return info.map(detail => detail.name);
     } else if (screenIndex === 'programExercises') {
       return days.filter(day => day.key === selectedDayKey).map(detail => detail.name);
     } else if (screenIndex === 'allPrograms') {
       return 'All Programs';
     }
   }

  render() {
    const styles = themeStyles[this.props.themeStore.selected];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    if (this.props.programStore.loading) {
      this.dropdown.alertWithType('info', "I'll be back", "We're Loading");
    }

    return (
      <LinearGradient colors={gradients} style={styles.homeContainer} >
        <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
        <Header title={this.renderTitle().toString().substring(0, 30)} styles={styles} />

        <Greeting styles={styles} />

        <ScrollView
          style={{ marginTop: 10 }}
          onScroll={event => this.setState({ scrollIndex: event.nativeEvent.contentOffset.y })}
        >
          <Programs navigation={this.props.navigation} />
        </ScrollView>

        <ActionBar scrollIndex={this.state.scrollIndex} navigation={this.props.navigation} />

        <DropdownAlert
          translucent
          closeInterval={1000}
          updateStatusBar={false}
          infoColor={styles.$tertiaryColor}
          titleStyle={styles.dropdownTitle}
          ref={ref => (this.dropdown = ref)}
          messageStyle={styles.dropdownMessage}
        />
      </LinearGradient>
    );
  }
}

export default Home;
