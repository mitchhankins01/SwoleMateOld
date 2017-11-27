import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
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
     const { programView } = this.refs;

     if (programView) {
       programView.flipInY();
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

  render() {
    const { theme } = this.state;
    const styles = themeStyles[theme];
    const gradients = [
      styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor
    ];

    // IMPLEMENT redux source
    const showAllPrograms = false;

    return (
      <LinearGradient
        colors={gradients} style={[styles.container, { justifyContent: 'flex-start' }]}
      >
        <Header title={showAllPrograms ? 'All Programs' : 'Home'} styles={styles} />

        <Greeting styles={styles} />

        <Animatable.View duration={500} ref='programView' animation='flipInY'>
          <ScrollView>
            <List containerStyle={styles.list}>
              <Programs styles={styles} />
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
    programError: state.program.error,
  };
};

export default connect(mapStateToProps)(Home);
