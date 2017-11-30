import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header';
import Programs from '../components/Programs';
import Greeting from '../components/Greeting';
import themeStyles from '../components/styles';
import ActionBar from '../components/ActionBar';
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

   componentWillMount() {
     this.props.dispatch(fetchTheme());
   }

   componentDidMount() {
     /* Check for error from loading FB Programs */
     this.renderError(this.props.programError);
   }

   componentWillUpdate() {
     const { programView, titleView } = this.refs;
     if (titleView) { titleView.zoomIn(); }
     if (programView) { programView.flipInY(); }
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

  render() {
    const styles = themeStyles[this.props.theme];
    const gradients = [styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor];

    return (
      <LinearGradient colors={gradients} style={styles.homeContainer} >

        <Header title={'Home'} styles={styles} />

        <Greeting styles={styles} />

        <Animatable.Text style={styles.title} ref='titleView' animation='zoomIn' >
          {this.renderTitle()}
        </Animatable.Text>

        <Animatable.View duration={500} ref='programView' animation='flipInY'>
          <ScrollView style={{ marginBottom: 250, marginTop: 10 }}>
            <List containerStyle={styles.list}>
              <Programs styles={styles} navigation={this.props.navigation} />
            </List>
          </ScrollView>
        </Animatable.View>

        <ActionBar styles={styles} navigation={this.props.navigation} />

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
    programError: program.error,
    screenIndex: program.screenIndex,
    selectedDayKey: program.selectedDayKey,
  };
};

export default connect(mapStateToProps)(Home);
