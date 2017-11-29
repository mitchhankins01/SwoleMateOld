import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { List } from 'react-native-elements';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import themeStyles from '../components/styles';
import Header from '../components/Header';
import Programs from '../components/Programs';
import ActionBar from '../components/ActionBar';
import Greeting from '../components/Greeting';

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

   constructor(props) {
     super(props);
     this.state = {
       theme: 'standard',
     };
   }

   componentDidMount() {
     /* Check for error from loading FB Programs */
     this.renderError(this.props.programError);

     const uid = firebase.auth().currentUser.uid;

     firebase.firestore().collection('users').doc(uid)
      .onSnapshot(userDoc => {
        this.setState({
          theme: userDoc.data().theme,
        });
      });
   }

   componentWillUpdate() {
     const { programView, titleView } = this.refs;

     if (programView) {
       programView.flipInY();
     }

     if (titleView) {
       titleView.zoomIn();
     }
   }

   renderError(error) {
     if (error) {
       this.dropdown.alertWithType(
         'error',
         'Something went wrong',
         error
       );
     }
   }

   renderTitle() {
     const { screenIndex } = this.props;

     if (screenIndex === 'primaryProgram') {
       return this.props.programInfo.map(info => info.name);
     } else if (screenIndex === 'allPrograms') {
       return 'All Programs';
     } else if (screenIndex === 'primaryProgramDetails') {
       return;
     }
   }

  render() {
    const { theme } = this.state;
    const styles = themeStyles[theme];
    const gradients = [
      styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor
    ];

    return (
      <LinearGradient colors={gradients} style={styles.homeContainer} >

        <Header title={'Home'} styles={styles} />

        <Greeting styles={styles} />

        <Animatable.Text style={styles.title} ref='titleView' animation='zoomIn' >
          {this.renderTitle()}
        </Animatable.Text>

        <Animatable.View duration={500} ref='programView' animation='flipInY'>
          <ScrollView style={{ marginBottom: 230 }}>
            <List containerStyle={styles.list}>
              <Programs styles={styles} navigation={this.props.navigation} />
            </List>
          </ScrollView>
        </Animatable.View>

        <ActionBar styles={styles} />

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

const mapStateToProps = (state) => {
  return {
    programInfo: state.program.info,
    programError: state.program.error,
    screenIndex: state.program.screenIndex,

    // Potentially used in renderTitle
    programExercises: state.program.exercises,
  };
};

export default connect(mapStateToProps)(Home);
