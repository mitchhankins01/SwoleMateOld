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
  programContainer: {
    margin: 15,
    padding: 15,
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 0.3,
    shadowColor: 'rgba(0,0,0, 1)',
    borderColor: '$primaryColor',
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  programTitle: {
    fontSize: 20,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
    marginHorizontal: 10,
  },
  programSubtitle: {
    fontSize: 16,
    fontFamily: 'exo',
    alignSelf: 'center',
    color: '#EDF0F1',
  },
  programDivider: {
    borderWidth: 0.5,
    marginVertical: 15,
    shadowOpacity: 0.2,
    borderColor: '$primaryColor',
  },
  programIcon: {
    color: '#EDF0F1'
  },
  warningText: {
    fontSize: 18,
    color: 'red',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
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
