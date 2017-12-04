import { Dimensions } from 'react-native';
import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  loadingContainer: {
    flex: 1,
    paddingVertical: 50,
    alignItems: 'center',
    height: DEVICE_HEIGHT * 0.53,
    justifyContent: 'space-around',
    backgroundColor: '$secondaryColor',
  },
  loadingText: {
    fontSize: 40,
    alignSelf: 'center',
    color: '$primaryColor',
    fontFamily: 'Exo-Bold',
    backgroundColor: 'transparent',
  },
  loadingTextSub: {
    fontSize: 30,
    marginBottom: 10,
    alignSelf: 'center',
    color: '$primaryColor',
    fontFamily: 'Exo-Medium',
    backgroundColor: 'transparent',
  },
  listItem: {
    height: 80,
    justifyContent: 'center',
    borderBottomColor: '$primaryColor'
  },
  listItemTitle: {
    fontFamily: 'Exo-Medium',
    color: '$tertiaryColor',
    alignSelf: 'center',
    fontSize: 18
  },
  listItemSubtitle: {
    color: '$tertiaryColor',
    alignSelf: 'center',
    fontFamily: 'exo',
    paddingTop: 5,
    fontSize: 14,
  },
  listItemIcon: {
    color: '$tertiaryColor',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
});

export default themeStyles;
