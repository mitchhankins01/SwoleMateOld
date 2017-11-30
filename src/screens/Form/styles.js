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
  popup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupTitle: {
    color: '$primaryColor',
    fontFamily: 'Exo-Medium',
    fontSize: 20,
  },
  popupTitleContainer: {
    backgroundColor: '$secondaryColor',
    borderBottomWidth: 0,
  },
  popupButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginBottom: 0,
    justifyContent: 'center',
    backgroundColor: '$secondaryColor',
  },
  jiroInputContainer: {
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.7,
    marginBottom: 5,
    borderRadius: 5,
  },
  jiroInput: {
    color: '$primaryColor',
    fontFamily: 'Exo-Regular',
    fontSize: 16,
  },
  dropdown: {
    height: 30,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'center',
    borderBottomWidth: 0,
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.7,
    backgroundColor: '$tertiaryColor',
  },
  dropdownText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '$primaryColor',
    fontFamily: 'Exo-Medium',
    width: DEVICE_WIDTH * 0.7,
    backgroundColor: 'transparent',
  },
  dropdownList: {
    height: 250,
    borderWidth: 0,
    borderRadius: 0,
    marginVertical: 5,
    alignSelf: 'center',
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: DEVICE_WIDTH * 0.7,
  },
  list: {
    alignSelf: 'center',
    width: DEVICE_WIDTH / 1.1,
    borderTopColor: '$primaryColor',
    backgroundColor: 'rgba(237, 240, 241, 0.07)',
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
    marginLeft: -10,
    fontSize: 18
  },
  listItemSubtitle: {
    color: '$tertiaryColor',
    alignSelf: 'center',
    fontFamily: 'exo',
    paddingTop: 5,
    fontSize: 14,
  },
  listItemAllExercisesIcon: {
    color: '$primaryColor',
    alignSelf: 'center',
    paddingLeft: 10,
    marginRight: -35,
  },
  formExerciseInput: {
    height: 90,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: DEVICE_WIDTH / 1.1,
    justifyContent: 'space-around',
    backgroundColor: '$secondaryColor',
  },
});

export default themeStyles;
