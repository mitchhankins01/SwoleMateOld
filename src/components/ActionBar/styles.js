import { Dimensions } from 'react-native';
import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  actionBar: {
    left: 30,
    right: 30,
    bottom: 30,
    height: 50,
    elevation: 1,
    borderWidth: 1,
    borderRadius: 10,
    shadowOpacity: 1,
    position: 'absolute',
    flexDirection: 'row',
    borderColor: '$primaryColor',
    shadowColor: '$primaryColor',
    backgroundColor: '$secondaryColor',
    shadowOffset: { width: 2, height: 2 },
  },
  actionBarView: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionBarWorkout: {
    //left: 30,
    top: 10,
    flex: 0.3,
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
  },
});

export default themeStyles;
