import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';
import Greeting from '../components/Greeting';
import themeStyles from '../components/styles';
import { Programs } from '../components/Programs';
import { ActionBar } from '../components/ActionBar';
import { fetchTheme } from '../actions/themeActions';

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
     this.props.dispatch(fetchTheme());
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
     const { programDays, programInfo, screenIndex, selectedDayKey } = this.props;

     if (screenIndex === 'primaryProgram' || screenIndex === 'selectedProgram') {
       return programInfo.map(info => info.name);
     } else if (screenIndex === 'programExercises') {
       return programDays.filter(day => day.key === selectedDayKey).map(info => info.name);
     } else if (screenIndex === 'allPrograms') {
       return 'All Programs';
     }
   }

   // renderActionBar() {
   //   console.log(this.state.scrollIndex);
   //   if (this.state.scrollIndex <= 2) {
   //     return (
   //       <Animatable.View animation='zoomIn' duration={500}>
   //         <ActionBar navigation={this.props.navigation} />
   //       </Animatable.View>
   //     );
   //   }
   //   return (
   //     <Animatable.View animation='zoomOut' duration={500}>
   //       <ActionBar navigation={this.props.navigation} />
   //     </Animatable.View>
   //   );
   // }

  render() {
    const styles = themeStyles[this.props.theme];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    return (
      <LinearGradient colors={gradients} style={styles.homeContainer} >
        <StatusBar backgroundColor='transparent' barStyle='light-content' />
        <Header title={'Home'} styles={styles} />

        <Greeting styles={styles} />

        {/* <Animatable.Text style={styles.title} ref='titleView' animation='zoomIn' >
          {this.renderTitle()}
        </Animatable.Text> */}
        <ScrollView
          onScroll={event => this.setState({ scrollIndex: event.nativeEvent.contentOffset.y })}
          style={{
            marginTop: 10,
            //marginBottom: 100,
          }}
        >
          <Programs styles={styles} navigation={this.props.navigation} />
        </ScrollView>

        <ActionBar scrollIndex={this.state.scrollIndex} navigation={this.props.navigation} />

        <DropdownAlert
          translucent
          closeInterval={2000}
          updateStatusBar={false}
          ref={ref => (this.dropdown = ref)}
        />
      </LinearGradient>
    );
  }
}

const mapStateToProps = ({ program, theme }) => {
  return {
    theme: theme.selected,
    programInfo: program.info,
    programDays: program.days,
    //editMode: program.editMode,
    programError: program.error,
    screenIndex: program.screenIndex,
    selectedDayKey: program.selectedDayKey,
  };
};

export default connect(mapStateToProps)(Home);
