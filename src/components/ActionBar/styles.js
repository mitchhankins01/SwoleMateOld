import { Dimensions } from 'react-native';
import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  actionBar: {
    height: 55,
    bottom: 20,
    elevation: 1,
    shadowOpacity: 1,
    borderWidth: 1.5,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.92,
    borderColor: '$primaryColor',
    shadowColor: '$primaryColor',
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  actionBarView: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 55,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionBarWorkout: {
    //left: 30,
    top: 10,
    height: 55,
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 1,
    marginBottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH * 0.92,
    borderColor: '$primaryColor',
    shadowColor: '$primaryColor',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
    shadowOffset: { width: 2, height: 2 },
  },
  workoutBarText: {
    fontSize: 16,
    fontFamily: 'exo',
    alignSelf: 'center',
    color: '#EDF0F1',
    width: 60,
  },
});

export default themeStyles;
