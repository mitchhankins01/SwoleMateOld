import React, { Component } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';
import { Jiro } from 'react-native-textinput-effects';
import Color from 'color';
import Header from '../components/Header';
import ActionBar from '../components/ActionBar';

class Form extends Component {
  constructor(props) {
     super(props);
     this.state = {
       // Add a Program
       programName: '',
       description: '',
       type: '',
       level: '',
       frequency: '',
       // Add Program Day
     };
   }

   validateForm(actionBarType) {
     switch (actionBarType) {
       case 'addNewProgram': {
         const { programName, description, type, level, frequency } = this.state;

         if (programName && description && type && level && frequency) {
           break;
         } else {
           this.dropdown.alertWithType('error', 'Missing Fields', 'Please fill out all fields');
         }
         break;
       }
       default:
         return;
     }
   }

   updateState(componentIndex, index, value) {
     const incrementedIndex = parseInt(index, 10) + 1;

     switch (componentIndex) {
       case 0: return this.setState({ type: value });
       case 1: return this.setState({ level: value });
       case 2: return this.setState({ frequency: incrementedIndex });
       case 3: return this.setState({ workoutDay: value });
       default: return;
     }
   }

   renderJiro(styles, title, stateRef) {
     return (
       <Jiro
         labelStyle={[styles.popupInput, { color: styles.$tertiaryColor }]}
         onChangeText={value => this.setState({ [stateRef]: value })}
         borderColor={styles.$tertiaryColor}
         style={styles.popupInputContainer}
         inputStyle={styles.popupInput}
         label={title}
       />
     );
   }

   renderDropdown(styles, componentIndex, title, options, bgColor) {
     return (
       <ModalDropdown
         renderSeparator={() => this.renderDropdownSeparator(styles)}
         style={[styles.popupDropdown, { borderBottomWidth: 0 }]}
         textStyle={styles.popupDropdownText}
         dropdownStyle={[styles.popupDropdown, {
           height: 250,
           backgroundColor: bgColor,
           alignItems: 'flex-start',
           borderRadius: 0,
           borderWidth: 0
         }]}
         dropdownTextStyle={styles.popupDropdownText}
         defaultValue={title}
         options={options}
         onSelect={(index, value) => this.updateState(componentIndex, index, value)}
       />
     );
   }

   renderDropdownSeparator(styles) {
     return (
       <View style={{ borderWidth: 1.0, borderColor: styles.$secondaryColor }} />
     );
   }

   renderAddNewProgram(styles) {
     const bgColor = Color(styles.$tertiaryColor).alpha(0.7);

     return (
       <View>
         {this.renderJiro(styles, 'Program Name', 'programName')}
         {this.renderJiro(styles, 'Description', 'description')}
         <View style={{ marginBottom: 10 }} />
         {this.renderDropdown(styles, 0, 'Select Type...',
           ['General', 'Bulking', 'Cutting', 'Maintaining'], bgColor
         )}
         {this.renderDropdown(styles, 1, 'Select Level...',
           ['Beginner', 'Intermediate', 'Avanced'], bgColor
         )}
         {this.renderDropdown(styles, 2, 'Select Frequency...',
           ['1 Day p/w', '2 Day p/w', '3 Day p/w', '4 Day p/w',
           '5 Day p/w', '6 Day p/w', '7 Day p/w'], bgColor
         )}
       </View>
     );
   }

   renderContentSwitch(styles, type) {
     switch (type) {
       default:
        return;
      case 'addNewProgram':
        return this.renderAddNewProgram(styles);
     }
   }

  render() {
    const { actionBarType, styles, title } = this.props.navigation.state.params;
    const gradients = [
      styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor
    ];

    return (
      <LinearGradient
        colors={gradients}
        style={[styles.container, { justifyContent: 'flex-start' }]}
      >
        <Header
          title={title}
          bgColor={styles.$secondaryColor}
          textColor={styles.$primaryColor}
        />
        <Animatable.View
          animation='slideInLeft'
          duration={1500}
          delay={0}
        >
          {this.renderContentSwitch(styles, actionBarType)}
        </Animatable.View>

        <ActionBar
          styles={styles}
          actionBarType={actionBarType}
          navigation={this.props.navigation}
          onPressSave={() => this.validateForm(actionBarType)}
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

export default Form;
