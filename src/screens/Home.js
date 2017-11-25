import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { List, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';

import themeStyles from '../components/styles';
import Header from '../components/Header';
import Programs from '../components/Programs';
import ActionBar from '../components/ActionBar';
import Greeting from '../components/Greeting';

//import ProgramForm from '../components/form';

const DEVICE_HEIGHT = Dimensions.get('window').height;

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
       actionBarType: 'primaryProgram',
       showAllPrograms: false,
       theme: 'standard',
       screenIndex: -1,
     };
   }

   componentDidMount() {
     const uid = firebase.auth().currentUser.uid;

     firebase.firestore().collection('users').doc(uid)
      .onSnapshot(userDoc => {
        //console.log(userDoc.data());
        this.setState({
          theme: userDoc.data().theme,
        });
      });
   }

  render() {
    const { theme, showAllPrograms, actionBarType } = this.state;
    const styles = themeStyles[theme];
    const gradients = [
      styles.$primaryColor,
      styles.$secondaryColor,
      styles.$tertiaryColor
    ];

    return (
      <LinearGradient
        colors={gradients}
        style={[styles.container, { justifyContent: 'flex-start' }]}
      >
        <Header
          title={showAllPrograms ? 'All Programs' : 'Home'}
          bgColor={styles.$secondaryColor}
          textColor={styles.$primaryColor}
        />
        <Greeting styles={styles} />
        <Animatable.View
          animation='slideInLeft'
          duration={1500}
          delay={0}
          style={{ height: DEVICE_HEIGHT * 0.6 }}
        >
          <ScrollView>
            <List containerStyle={styles.list}>
              <Programs
                styles={styles}
                type={actionBarType}
                showAllPrograms={this.state.showAllPrograms}
                primaryProgramDetailsButton={() => this.setState({
                  actionBarType: 'primaryProgramDetails' })
                }
              />
            </List>
          </ScrollView>
        </Animatable.View>

        <ActionBar
          styles={styles}
          actionBarType={actionBarType}
          onPressAddNewProgram={() => this.props.navigation.navigate('Form', {
            styles,
            title: 'Add a Program',
            actionBarType: 'addNewProgram'
          })}
          onPressShowAllPrograms={() => this.setState({
            actionBarType: 'allPrograms',
            showAllPrograms: !this.state.showAllPrograms
          })}
          onPressShowPrimaryProgram={() => this.setState({
            actionBarType: 'primaryProgram',
            showAllPrograms: !this.state.showAllPrograms
          })}
          onPressBackToPrimaryProgram={() => this.setState({
            actionBarType: 'primaryProgram',
            showAllPrograms: false
          })}

        />

        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          translucent
          updateStatusBar={false}
          closeInterval={2000}
        />
      </LinearGradient>
    );
  }
}

export default Home;
