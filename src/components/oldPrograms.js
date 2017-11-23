import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import Entypo from 'react-native-vector-icons/Entypo';
import { ListItem, Button } from 'react-native-elements';
import _ from 'lodash';

const getIcon = (type, styles, iconDetails) => {
  switch (type) {
    case 'program':
      return (
        <View style={styles.programIcon}>
          <Text style={styles.programDay}>
            {iconDetails}
          </Text>
        </View>
      );
    case 'details':
      return (
        <View style={[styles.programIcon, { width: 30, height: 30, borderRadius: 15 }]}>
         <Entypo name={iconDetails} size={20} style={{ color: styles.$primaryColor }} />
        </View>
      );
    default:
      return;
  }
};

// const getSubtitle = (i, item) => {
//   return (
//     i === details.length - 1
//     ? 'Return to Program'
//     : `${item.sets} Sets - ${item.reps} Reps - ${item.rest}s Rest`
//   );
// };

class Programs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      primaryProgram: {},
      loading: true,
      programs: [],
    };
  }

  componentWillMount() {
    const uid = firebase.auth().currentUser.uid;

    firebase.firestore().collection('users').doc(uid)
     .onSnapshot(userDoc => {
       this.fetchPrimaryProgram(userDoc.data().primaryProgram);
     });

    this.fetchAllPrograms(uid);
  }

  fetchAllPrograms(uid) {
    const programs = [];

    firebase.firestore().collection('userPrograms').where('author', '==', uid)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(program => {
        const {
          author, days, description, level, name, type
        } = program.data();

        programs.push({
          key: program.id,
          program, // DocumentSnapshot
          author,
          days,
          description,
          level,
          name,
          type
        });
      });
    });

    this.setState({
      programs,
      loading: false
    });
  }

  fetchPrimaryProgram(primaryProgramKey) {
    firebase.firestore().collection('userPrograms').where('key', '==', primaryProgramKey)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(primaryProgram => {
        this.setState({ primaryProgram: primaryProgram.data() });
      });
    });
  }

  renderContent = (
    styles,
    program,
    containerHeight,
    showDetails,
    onPress,
  ) => {
    return (
      <ListItem
        hideChevron
        containerStyle={{
          height: containerHeight,
          justifyContent: 'center',
          borderBottomColor: styles.$primaryColor
        }}
        title={program.name}
        titleStyle={[
          styles.listItemTitle,
          { alignSelf: 'center', color: styles.$tertiaryColor, fontSize: 18 }
        ]}
        // subtitle={
        //   showDetails ? getSubtitle(i, item) : item.subtitle
        // }
        subtitleStyle={{
          alignSelf: 'center',
          color: styles.$primaryColor,
          fontSize: 14,
          fontFamily: 'exo'
        }}
        key={program.id}
        // leftIcon={
        //   details ? getIcon('details', styles, item.icon) : getIcon('program', styles, item.day)
        // }
        onPress={() => {}}//onPress(i)}
        underlayColor={'transparent'}
      />
    );
  }
  //
  // renderAllPrograms(dispatch, styles, programs) {
  //   return (
  //     _.map(programs, program => {
  //       return (
  //         <ListItem
  //           hideChevron
  //           containerStyle={{
  //             height: 120,
  //             justifyContent: 'center',
  //             borderBottomColor: styles.$primaryColor
  //           }}
  //           title={program.name}
  //           titleStyle={[
  //             styles.listItemTitle,
  //             { alignSelf: 'center', color: styles.$tertiaryColor, fontSize: 22 }
  //           ]}
  //           key={program.name}
  //           leftIcon={
  //             <View style={[styles.programIcon, { width: 50, height: 50, borderRadius: 25 }]}>
  //               <Icon name={'clipboard'} size={25} style={{ color: styles.$primaryColor }} />
  //             </View>
  //           }
  //           subtitle={
  //             `${program.days} Workout Days\n${program.level} Level\n${program.typeProgram} Type`
  //           }
  //           subtitleNumberOfLines={3}
  //           subtitleStyle={{
  //             alignSelf: 'center',
  //             color: styles.$primaryColor,
  //             fontSize: 14,
  //             fontFamily: 'exo'
  //           }}
  //           onPress={() => dispatch(viewDetailsOfAllPrograms(program.key))}
  //           underlayColor={'transparent'}
  //         />
  //       );
  //     })
  //   );
  // }
  //
  // renderProgramDays(dispatch, styles, programs, programsIndex) {
  //   console.log('-------');
  //   //this.props.dispatch(fetchProgramDays(this.props.user.uid, programsIndex));
  //   _.map(programs, program => {
  //     if (program === programs[programsIndex]) {
  //       _.forEach(program, (key, value) => {
  //         console.log(key);
  //         //console.log(value);
  //       });
  //     }
  //   });
  //   // IMPLEMENT => IF PROGRAM LIST IS EMPTY, PROMPT USER TO ADD EXERCISES
  //   return (
  //     <View>
  //       <Button onPress={() => dispatch(viewDetailsOfAllPrograms(69))} title='back' />
  //       <Button onPress={() => console.log(this.props.program.programDays)} title='programs' />
  //     </View>
  //   );
  // }

  render() {
    const { styles, type } = this.props;

    if (this.state.loading) {
      return <Text> Loading </Text>;
    }

    return this.renderContent(
      styles,
      this.state.primaryProgram,
      80,
      false,
      (i) => {},
    );

    // if (showAll) {
    //   switch (programsIndex) {
    //     case 69: return this.renderAllPrograms(dispatch, styles, programs);
    //     default: return this.renderProgramDays(dispatch, styles, programs, programsIndex);
    //   }
    // }
    // switch (index) {
    //   case 69:
    //     return this.renderContent(
    //       options,
    //       80,
    //       false,
    //       (i) => dispatch(viewDetails(i)),
    //       dispatch,
    //       styles,
    //     );
    //   default:
    //     return this.renderContent(
    //       details,
    //       60,
    //       true,
    //       () => dispatch(viewDetails(69)),
    //       dispatch,
    //       styles,
    //     );
    // }
  }
}

export default Programs;
