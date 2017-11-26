import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { List } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';

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
       actionBarType: 'primaryProgram',
       showAllPrograms: false,
       theme: 'standard',
     };
   }

   componentDidMount() {
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

  render() {
    const { theme, showAllPrograms, actionBarType } = this.state;
    const styles = themeStyles[theme];
    const gradients = [
      styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor
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

        <Animatable.View duration={500} ref='programView' animation='flipInY'>
          <ScrollView>
            <List containerStyle={styles.list}>
              <Programs
                styles={styles}
                type={actionBarType}
                showAllPrograms={this.state.showAllPrograms}
                onPressPrimaryProgramDetails={() => this.setState({
                  actionBarType: 'primaryProgramDetails' })
                }
                onPressAllProgramsDetails={() => this.setState({
                  showAllPrograms: false,
                  actionBarType: 'allProgramsDetails'
                })
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
          onPressBackToAllPrograms={() => this.setState({
            actionBarType: 'allPrograms',
            showAllPrograms: true
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
