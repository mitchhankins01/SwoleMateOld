import { Dimensions, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

function makeAwesome(translationType, pivotPoint) {
  const modifier = Math.min(1, Math.max(-1, pivotPoint));
  return {
    easing: Easing.bezier(0.175, 0.885, 0.32, 1),
    0: {
      opacity: 0,
      scale: 0.1,
      [translationType]: modifier * -1000,
    },
    0.6: {
      opacity: 1,
      scale: 0.457,
      [translationType]: pivotPoint,
    },
    1: {
      scale: 1,
      [translationType]: 0,
    },
  };
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
      translateY: 500
    },
    to: {
      translateY: 0
    },
  },
  mySlideInDown: {
    from: {
      translateY: -500
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
  mySlideInLeft: {
    from: {
      translateX: -500
    },
    to: {
      translateX: 0
    },
  },
  mySlideInRight: {
    from: {
      scale: 0.01,
      translateX: 500
    },
    to: {
      scale: 1,
      translateX: 0
    },
  },
  mySlideOutLeft: {
    from: {
      scale: 1,
      translateX: 0
    },
    to: {
      scale: 0.01,
      translateX: -500
    },
  },
});
