import { Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const Constants = {
  DEV_WIDTH: DEVICE_WIDTH,
  DEV_HEIGHT: DEVICE_HEIGHT,
};

export default Constants;
