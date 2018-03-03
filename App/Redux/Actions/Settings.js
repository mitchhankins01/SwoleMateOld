import firebase from 'react-native-firebase';
import EStyleSheet from 'react-native-extended-stylesheet';

export const updateSetting = ( toUpdate, value, errorCB, successCb ) => {
  switch ( toUpdate ) {
    default:
      return;
    case 'Name': {
      if ( value.length === 0 ) {
        return errorCB( 'Please enter a valid Name' );
      }

      firebase
        .firestore()
        .collection( 'users' )
        .doc( firebase.auth().currentUser.uid )
        .update( { name: value } )
        .then( () => successCb() )
        .catch( error => errorCB( error.message ) );
      break;
    }
    case 'Email': {
      if ( value.length === 0 ) {
        return errorCB( 'Please enter a valid Email' );
      }

      firebase
        .auth()
        .currentUser.updateEmail( value )
        .then( () => successCb() )
        .catch( error => errorCB( error.message ) );
      break;
    }
    case 'Password': {
      if ( value.length === 0 ) {
        return errorCB( 'Please enter a valid Email' );
      }

      firebase
        .auth()
        .sendPasswordResetEmail( value )
        .then( () => successCb() )
        .catch( error => errorCB( error.message ) );
      break;
    }
    case 'Delete': {
      firebase
        .auth()
        .currentUser.delete()
        .then( () => successCb() )
        .catch( error => errorCB( error.message ) );
      break;
    }
  }
};

export const toggleImperial = ( imperial, errorCB, successCb ) => {
  firebase
    .firestore()
    .collection( 'users' )
    .doc( firebase.auth().currentUser.uid )
    .update( { imperial: !imperial } )
    .then( () => successCb() )
    .catch( error => errorCB( error.message ) );
};

export const updateTheme = ( theme, cb ) => {
  firebase
    .firestore()
    .collection( 'users' )
    .doc( firebase.auth().currentUser.uid )
    .update( { theme } )
    .then( () => cb() )
    .catch( ( error ) => {
      this.error = error;
      this.showError = true;
    } );

  EStyleSheet.build( getTheme( theme ) );
};

export function getTheme( theme ) {
  const standard = {
    $theme: 'standard',
    $text: '#e7f2fe',
    $primaryColor: '#70B2F9',
    $tertiaryColor: '#38597C',
    $secondaryColor: '#4872A0',
    $bgColor: 'rgba(0, 0, 0, 0.1)',
  };

  const standard2 = {
    $theme: 'standard2',
    $text: '#EFD6FF',
    $primaryColor: '#CD83F8',
    $secondaryColor: '#925EB1',
    $tertiaryColor: '#67427B',
    $bgColor: 'rgba(0, 0, 0, 0.1)',
  };

  const standard3 = {
    $theme: 'standard3',
    $text: '#f4cfa4',
    $primaryColor: '#E69435',
    $secondaryColor: '#C56F28',
    $tertiaryColor: '#AA521E',
    $bgColor: 'rgba(0, 0, 0, 0.1)',
  };

  switch ( theme ) {
    default:
      return standard;
    case 'standard':
      return standard;
    case 'standard2':
      return standard2;
    case 'standard3':
      return standard3;
  }
}
