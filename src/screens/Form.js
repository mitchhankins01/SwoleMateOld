import Color from 'color';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import * as A from 'react-native-animatable';
import { Dimensions, View } from 'react-native';
import { Jiro } from 'react-native-textinput-effects';
import DropdownAlert from 'react-native-dropdownalert';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import PopupDialog, {
  DialogTitle,
  SlideAnimation
} from 'react-native-popup-dialog';

import Header from '../components/Header';
import ActionBar from '../components/ActionBar';
import {
  addNewProgram,
  fetchAllPrograms,
} from '../actions/program_actions';

const DEVICE_WIDTH = Dimensions.get('window').width;

class Form extends Component {
  constructor(props) {
     super(props);
     this.state = {
       // Add a Program
       type: '',
       level: '',
       frequency: '',
       programName: '',
       description: '',
       // Add Program Day
     };
   }

   validateForm(screenIndex) {
     const { dispatch } = this.props;

     switch (screenIndex) {
       case 'addNewProgram': {
         const { programName, description, type, level, frequency } = this.state;

         if (programName && description && type && level && frequency) {
           dispatch(addNewProgram(programName, description, type, level, frequency, () => {
             dispatch(fetchAllPrograms());
             this.popup.show();
           }));
         } else {
           this.dropdown.alertWithType(
             'error', 'Missing Fields', 'Please fill out all fields');
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

   renderPopupComponent(component, styles) {
     const iconStyle = { marginBottom: 50 };
     const buttonStyle = { position: 'absolute', bottom: 20 };

     switch (component) {
       default: return;
       case 'title':
         return (
           <DialogTitle
           title={'Changes Saved'}
           titleTextStyle={styles.popupTitle}
           titleStyle={styles.popupTitleContainer}
           />
         );
        case 'icon':
          return (
            <A.View duration={2500} animation='zoomIn' iterationCount='infinite' style={iconStyle}>
              <A.View duration={2500} animation='rotate' iterationCount='infinite'>
                <Icon size={100} name='check' type='entypo' color={styles.$tertiaryColor} />
              </A.View>
            </A.View>
        );
       case 'button':
         return (
           <A.View animation='slideInLeft' duration={2500} style={buttonStyle} >
             <Icon
               raised
               size={40}
               name='close'
               type='font-awesome'
               color={styles.$tertiaryColor}
               containerStyle={styles.popupButton}
               onPress={() => this.props.navigation.goBack(null)}
             />
           </A.View>
         );
      }
   }

   renderPopup(styles, gradients) {
     return (
       <PopupDialog
         width={DEVICE_WIDTH * 0.9}
         dismissOnTouchOutside={false}
         dismissOnHardwareBackPress={false}
         ref={(popupDialog) => { this.popup = popupDialog; }}
         dialogTitle={this.renderPopupComponent('title', styles)}
         dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
       >
        <LinearGradient colors={gradients} style={styles.popup}>
          {this.renderPopupComponent('icon', styles)}
          {this.renderPopupComponent('button', styles)}
        </LinearGradient>
       </PopupDialog>
     );
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

   renderContentSwitch(styles, screenIndex) {
     switch (screenIndex) {
       default:
        return;
      case 'addNewProgram':
        return this.renderAddNewProgram(styles);
     }
   }

  render() {
    const { screenIndex } = this.props;
    const { styles, title } = this.props.navigation.state.params;
    const gradients = [
      styles.$primaryColor, styles.$secondaryColor, styles.$tertiaryColor
    ];

    return (
      <LinearGradient
        colors={gradients} style={[styles.container, { justifyContent: 'flex-start' }]}
      >
        <Header title={title} styles={styles} />
        <A.View delay={0} duration={1500} animation='slideInLeft' >
          {this.renderContentSwitch(styles, screenIndex)}
        </A.View>
        <ActionBar
          styles={styles}
          navigation={this.props.navigation}
          onPressSave={() => this.validateForm(screenIndex)}
        />
        {this.renderPopup(styles, gradients)}
        <DropdownAlert
          translucent
          closeInterval={5000}
          updateStatusBar={false}
          ref={ref => (this.dropdown = ref)}
        />
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenIndex: state.program.screenIndex,
  };
};

export default connect(mapStateToProps)(Form);
