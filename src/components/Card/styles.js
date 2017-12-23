import { Dimensions } from 'react-native';
import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  cardContainer: {
    margin: 15,
    padding: 15,
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 0.3,
    borderColor: '$primaryColor',
    shadowColor: 'rgba(0,0,0, 1)',
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  logCardContainer: {
    flex: 1,
    margin: 15,
    padding: 15,
    elevation: 1,
    borderWidth: 2,
    borderRadius: 5,
    shadowOpacity: 0.3,
    //justifyContent: 'center',
    borderColor: '$primaryColor',
    shadowColor: 'rgba(0,0,0, 1)',
    shadowOffset: { height: 0, width: 0 },
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
  },
  cardTitle: {
    fontSize: 20,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
    marginHorizontal: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    fontFamily: 'exo',
    alignSelf: 'center',
    color: '#EDF0F1',
  },
  cardDivider: {
    borderWidth: 0.5,
    marginVertical: 15,
    borderColor: '$primaryColor',
  },
  cardIcon: {
    color: '#EDF0F1',
    padding: 15,
    margin: -15,
  },
  warningText: {
    fontSize: 18,
    color: 'red',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
  },
  logTitle: {
    fontSize: 20,
    color: '#EDF0F1',
    fontFamily: 'Exo-Bold',
  },
  logDetail: {
    fontSize: 20,
    color: '#EDF0F1',
    fontFamily: 'Exo-Medium',
  },
  // Settings
  settingsHeader: {
    fontSize: 18,
    color: '#EDF0F1',
    alignSelf: 'center',
    fontFamily: 'Exo-Medium',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  settingsOption: {
    fontSize: 18,
    color: '#EDF0F1',
    marginLeft: 10,
    fontFamily: 'Exo-Medium',
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    borderColor: '$primaryColor',
    justifyContent: 'flex-start',
  },
});

export default themeStyles;
