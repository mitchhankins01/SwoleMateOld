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
      // translateX: DEVICE_WIDTH,
      // translateY: -DEVICE_HEIGHT / 0.6,
      scale: 5,
    },
    to: {
      // translateX: 0,
      // translateY: 0,
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
});
