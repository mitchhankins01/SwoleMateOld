import React, { Component } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';

import { Fonts, Colors } from '../Themes'

class Programs extends Component {
 render () {
   this.props.navigation.navigate('Login');
   
    return (
      <View style={{ backgroundColor: 'red', flex: 1}}>
        <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />
        
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
//   startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(Programs)
