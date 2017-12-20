import { Dimensions } from 'react-native';
import themes from '../../components/theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'flex-start',
  },
  list: {
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 0.3,
    alignSelf: 'center',
    width: DEVICE_WIDTH / 1.1,
    borderColor: '$primaryColor',
    shadowColor: 'rgba(0,0,0, 1)',
    borderTopColor: '$primaryColor',
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  listItemTitle: {
    color: '#EDF0F1',
    fontFamily: 'Exo-Medium',
  },
  avatar: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default themeStyles;
