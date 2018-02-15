import createStore from '../Redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { BackHandler, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ReduxNavigation from '../Navigation/ReduxNavigation';

const store = createStore();
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class App extends Component {
  constructor() {
    super();
    EStyleSheet.build({
      $text: '#EDF0F1',
      $theme: 'standard',
      $primaryColor: '#70B2F9',
      $tertiaryColor: '#38597C',
      $secondaryColor: '#4872A0',
      $bgColor: 'rgba(0, 0, 0, 0.1)',
    });
  }

  componentWillMount() {
    // console.log(this.props);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // if (this.props.)
      console.log(this.props);
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
      <Provider store={store}>
        <ReduxNavigation />
      </Provider>
    );
  }
}

Animatable.initializeRegistryWithDefinitions({
  awesomeOut: {
    from: {
      translateX: 0,
      translateY: 0,
      scale: 1,
    },
    to: {
      translateX: DEVICE_WIDTH,
      translateY: -DEVICE_HEIGHT / 0.6,
      scale: 10,
    },
  },
  awesomeIn: {
    from: {
      opacity: 0,
      scale: 5,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
  },
  mySlideInUp: {
    from: {
      translateY: DEVICE_HEIGHT,
    },
    to: {
      translateY: 0,
    },
  },
  mySlideOutUp: {
    from: {
      translateY: 0,
    },
    to: {
      translateY: -500,
    },
  },
  mySlider: {
    0: {
      opacity: 1,
      translateY: 0,
    },
    0.5: {
      opacity: 0,
      translateY: -500,
    },
    0.50001: {
      opacity: 0,
      translateY: 500,
    },
    1: {
      opacity: 1,
      translateY: 0,
    },
  },
  mySlideInDown: {
    from: {
      scale: 0.01,
      translateY: -500,
    },
    to: {
      scale: 1,
      translateY: 0,
    },
  },
  mySlideInLeft: {
    from: {
      scale: 0.01,
      translateX: -500,
    },
    to: {
      scale: 1,
      translateX: 0,
    },
  },
  mySlideInRight: {
    from: {
      scale: 0.01,
      translateX: 500,
    },
    to: {
      scale: 1,
      translateX: 0,
    },
  },
  mySlideOutLeft: {
    from: {
      scale: 1,
      opacity: 1,
      translateX: 0,
    },
    to: {
      scale: 0.01,
      opacity: 0.5,
      translateX: -500,
    },
  },
});
