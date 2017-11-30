import Color from 'color';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as A from 'react-native-animatable';
import { Jiro } from 'react-native-textinput-effects';
import Entypo from 'react-native-vector-icons/Entypo';
import DropdownAlert from 'react-native-dropdownalert';
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions, View, ScrollView } from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import PopupDialog, {
  DialogTitle,
  SlideAnimation
} from 'react-native-popup-dialog';

import Header from '../components/Header';
import ActionBar from '../components/ActionBar';
import {
  fetchProgram,
  addProgram,
  addProgramDay,
  fetchAllPrograms,
  fetchAllExercises,
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
       dayName: '',
       dayDescription: '',
       primaryGroup: '',
       secondaryGroup: '',
       // Add Program Exercise
       exerciseList: [],
       selectedExercise: '',
     };
   }

   componentWillMount() {
     this.props.dispatch(fetchAllExercises());
   }

   componentWillUpdate() {
     if (!this.props.loading) { this.filterExercises('Show All'); }
   }

   onClosePressed() {
     const { dispatch, navigation } = this.props;
     dispatch(fetchProgram());
     navigation.goBack(null);
   }

   validateForm(screenIndex) {
     const { dispatch } = this.props;

     switch (screenIndex) {
       case 'addProgram': {
         const { programName, description, type, level, frequency } = this.state;

         if (programName && description && type && level && frequency) {
           dispatch(addProgram(programName, description, type, level, frequency, () => {
             dispatch(fetchAllPrograms());
             this.popup.show();
           }));
         } else {
           this.dropdown.alertWithType(
             'error', 'Missing Fields', 'Please fill out all fields');
         }
         break;
       }
       case 'addProgramDay': {
         const { dayName, dayDescription, primaryGroup, secondaryGroup } = this.state;
         const key = this.props.programInfo[0].key;

         if (dayName && dayDescription && primaryGroup && secondaryGroup) {
           dispatch(addProgramDay(
             key, dayName, dayDescription, primaryGroup, secondaryGroup, () => {
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
       case 3: return this.setState({ primaryGroup: value });
       case 4: return this.setState({ secondaryGroup: value });
       case 5: return this.filterExercises(value);
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
               onPress={() => this.onClosePressed()}
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

   renderJiro(styles, title, stateRef, width) {
     let style =
       width ? style = [styles.jiroInputContainer, { width }] : style = styles.jiroInputContainer;
     return (
       <Jiro
         style={style}
         label={title}
         inputStyle={styles.jiroInput}
         borderColor={styles.$tertiaryColor}
         onChangeText={value => this.setState({ [stateRef]: value })}
         labelStyle={[styles.jiroInput, { color: styles.$tertiaryColor }]}
       />
     );
   }

   renderDropdown(styles, componentIndex, title, options, backgroundColor) {
     return (
       <ModalDropdown
         options={options}
         defaultValue={title}
         style={styles.dropdown}
         textStyle={styles.dropdownText}
         dropdownTextStyle={styles.dropdownText}
         dropdownStyle={[styles.dropdownList, { backgroundColor }]}
         renderSeparator={() => this.renderDropdownSeparator(styles)}
         onSelect={(index, value) => this.updateState(componentIndex, index, value)}
       />
     );
   }

   renderDropdownSeparator(styles) {
     return (
       <View style={{ borderWidth: 1.0, borderColor: styles.$secondaryColor }} />
     );
   }

   renderAddProgram(styles) {
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

   renderAddProgramDay(styles) {
     const bgColor = Color(styles.$tertiaryColor).alpha(0.7);

     return (
       <View>
         {this.renderJiro(styles, 'Day Name', 'dayName')}
         {this.renderJiro(styles, 'Description', 'dayDescription')}
         <View style={{ marginBottom: 10 }} />
         {this.renderDropdown(styles, 3, 'Select Primary Group...',
           ['Biceps', 'Triceps', 'Legs', 'Calves'], bgColor
         )}
         {this.renderDropdown(styles, 4, 'Select Secondary Group...',
           ['Legs', 'Shoulders', 'Arms'], bgColor
         )}
       </View>
     );
   }

   renderAddProgramExercise(styles) {
     const bgColor = Color(styles.$tertiaryColor).alpha(0.7);
     return (
       <View>
         <View style={{ marginBottom: 20 }} />
         {this.renderDropdown(styles, 5, 'Show All',
           ['Show All', 'Abs', 'Back', 'Biceps', 'Calves', 'Chest',
           'Fore-arms', 'Glutes', 'Shoulders', 'Triceps', 'Cardio'], bgColor
         )}
         <View style={styles.formExerciseInput} >
           {this.renderJiro(styles, 'Sets', 'sets', 75)}
           {this.renderJiro(styles, 'Reps', 'reps', 75)}
           {this.renderJiro(styles, 'Rest', 'rest', 75)}
         </View>
         <A.View duration={500} ref='programView' animation='flipInY'>
           <ScrollView style={{ marginTop: 10 }}>
             <List containerStyle={styles.list}>
               {this.renderExerciseList(styles)}
             </List>
           </ScrollView>
         </A.View>
       </View>
     );
   }

   renderExerciseList(styles) {
     const { exerciseList, selectedExercise } = this.state;
     return (
       exerciseList.map(exercise => {
         const icon = exercise.key === selectedExercise ?
           <Entypo style={styles.listItemIcon} name={'check'} size={30} /> : null;
         const style = exercise.key === selectedExercise ?
           [styles.listItem, { backgroundColor: 'rgba(237, 240, 241, 0.075)' }] : styles.listItem;
         return (
           <ListItem
             hideChevron
             leftIcon={icon}
             key={exercise.key}
             title={exercise.name}
             containerStyle={style}
             subtitle={exercise.group}
             underlayColor={'transparent'}
             titleStyle={styles.listItemProgramsTitle}
             subtitleStyle={styles.listItemProgramsSubtitle}
             onPress={() => this.handleExerciseClick(exercise, selectedExercise)}
           />
         );
       })
     );
   }

   handleExerciseClick(exercise, selectedExercise) {
     if (exercise.key === selectedExercise) {
       this.setState({ selectedExercise: '' });
     } else { this.setState({ selectedExercise: exercise.key }); }
   }

   filterExercises(value) {
     if (value === 'Show All') {
       return this.setState({ exerciseList: this.props.allExercises });
     }

     const filteredExercises = this.props.allExercises.filter(exercise => {
       return exercise.group === value;
     });

     this.setState({ exerciseList: filteredExercises });
   }

   renderContentSwitch(styles, screenIndex) {
     switch (screenIndex) {
      default:
        break;
      case 'addProgram':
        return this.renderAddProgram(styles);
      case 'addProgramDay':
        return this.renderAddProgramDay(styles);
      case 'addProgramExercise':
        return this.renderAddProgramExercise(styles);
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

const mapStateToProps = ({ program }) => {
  return {
    loading: program.loading,
    programInfo: program.info,
    screenIndex: program.screenIndex,
    allExercises: program.allExercises,
  };
};

export default connect(mapStateToProps)(Form);
