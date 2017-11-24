import React, { Component } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { List, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';
import PopupDialog, {
  DialogTitle,
  SlideAnimation
} from 'react-native-popup-dialog';

import themeStyles from '../components/styles';
import Header from '../components/Header';
import Programs from '../components/Programs';
import ExpandingButton from '../components/actionButton';
import Greeting from '../components/Greeting';

//import ProgramForm from '../components/form';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

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
       expandingButtonType: 'main',
       showAllPrograms: false,
       theme: 'standard',
       screenIndex: -1,
       popupType: '-',
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

  popupDismissed(type) {
    switch (type) {
      case 'cancel':
        return (
          this.popup.dismiss(),
          this.dropdown.alertWithType(
            'error', 'Cancelled', 'Any changes were not saved'
          )
        );
      case 'save':
        return (
          this.popup.dismiss(),
          this.dropdown.alertWithType(
            'success', 'Saved', 'Changes successfully saved'
          )
        );
      default:
        return;
    }
  }

  programPopup(type) {
    this.setState({ popupType: type }, () => {
      this.popup.show();
    });
  }

  renderPopup(styles, gradients) {
    const type = this.state.popupType;
    let title = '';

    if (type === 'newProgram') {
      title = 'Add New Program';
    } else if (type === 'newProgramDay') {
      title = 'Add Workout Day';
    }

    return (
      <PopupDialog
        ref={(popupDialog) => { this.popup = popupDialog; }}
        dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        width={DEVICE_WIDTH * 0.9}
        height={DEVICE_HEIGHT * 0.7}
        dialogTitle={
          <DialogTitle
          title={title}
          titleStyle={{ backgroundColor: styles.$secondaryColor, borderBottomWidth: 0 }}
          titleTextStyle={styles.popupTitle}
          />}
      >
      <LinearGradient
        colors={gradients}
        style={[styles.container, { justifyContent: 'flex-start' }]}
      >
      {/*
        <ProgramForm
          type={type}
          onCancel={() => this.popupDismissed('cancel')}
          onSave={() => this.popupDismissed('save')}
          emptyFields={
            () => this.dropdown.alertWithType(
            'error', 'Missing Fields', 'Please fill out all fields'
            )
          }
        />
      */}
      </LinearGradient>
      </PopupDialog>
    );
  }

  render() {
    const { theme, showAllPrograms } = this.state;
    const styles = themeStyles[theme];
    const gradients = [
      styles.$primaryColor,
      styles.$secondaryColor,
      styles.$tertiaryColor
    ];
    //console.log(this.state.expandingButtonType);
    // let expandingButtonType = 'home';
    // if (indexAllPrograms === 69 && showAll === true) {
    //   expandingButtonType = 'allPrograms';
    // } else if (indexAllPrograms !== 69 && showAll === true) {
    //   expandingButtonType = 'allProgramsDetails';
    // } else {
    //   expandingButtonType = 'home';
    // }

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
                type={this.state.expandingButtonType}
                showAllPrograms={this.state.showAllPrograms}
                primaryProgramDetailsButton={
                  () => this.setState({ expandingButtonType: 'primaryProgramDetails' })
                }
              />
            </List>
          </ScrollView>
        </Animatable.View>

        <ExpandingButton
          styles={styles}
          showAllPrograms={this.state.showAllPrograms}
          type={this.state.expandingButtonType}
          showPrimaryButton={
            () => this.setState({
              expandingButtonType: 'main',
              showAllPrograms: !this.state.showAllPrograms
            })
          }
          onPressAddNewProgram={
            () => this.programPopup('newProgram')
          }
          onPressAddNewProgramDay={
            () => this.programPopup('newProgramDay')
          }
          onPressShowAllPrograms={
            () => this.setState({
              expandingButtonType: 'allPrograms',
              showAllPrograms: !this.state.showAllPrograms
            })
          }
        />

        {this.renderPopup(styles, gradients)}

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
