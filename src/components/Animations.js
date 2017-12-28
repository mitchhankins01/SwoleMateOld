import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

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
      translateY: 500
    },
    to: {
      translateY: 0
    },
  },
  mySlideOutUp: {
    from: {
      translateY: 0
    },
    to: {
      translateY: -500
    },
  },
  mySlider: {
    0: {
      opacity: 1,
      translateY: 0
    },
    0.5: {
      opacity: 0,
      translateY: -500
    },
    0.50001: {
      opacity: 0,
      translateY: 500
    },
    1: {
      opacity: 1,
      translateY: 0
    },
  },
  mySlideInDown: {
    from: {
      scale: 0.01,
      translateY: -500
    },
    to: {
      scale: 1,
      translateY: 0
    },
  },
  mySlideInLeft: {
    from: {
      scale: 0.01,
      translateX: -500
    },
    to: {
      scale: 1,
      translateX: 0
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
