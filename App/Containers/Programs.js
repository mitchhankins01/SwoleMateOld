import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';


class Programs extends Component {
 render () {
    return (
      <View style={{ backgroundColor: 'red', flex: 1}}>
        <StatusBar barStyle='light-content' />
        
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
//   startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(Programs)
