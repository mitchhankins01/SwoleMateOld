import { Dimensions } from 'react-native';
import themes from './theme';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const themeStyles = themes.createStyleSheet({
  container: {
    //alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: null,
    height: null,
  },
  appName: {
    fontSize: 40,
    fontFamily: 'Exo-Bold',
    color: '#FFF',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    //marginTop: 50,
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontFamily: 'Exo-Medium',
    fontWeight: '400',
    color: '#FFF',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  formLabel: {
    backgroundColor: 'transparent',
  },
  formLabelText: {
    fontSize: 18,
    fontFamily: 'Exo-Medium',
    fontWeight: '400',
    color: '#FFF',
  },
  input: {
    fontFamily: 'Exo-Regular',
    color: '#FFF',
    paddingLeft: 10,
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  errorTextStyle: {
    fontSize: 20,
    margin: 10,
    alignSelf: 'center',
    color: 'red',
    backgroundColor: 'transparent',
    fontFamily: 'Exo-Bold',
  },
  buttonGroup: {
    marginTop: 10,
    backgroundColor: 'transparent',
    borderColor: '#EDF0F1',
    borderWidth: 0,
    width: '90%',
    alignSelf: 'center',
  },
  buttonGroupText: {
    color: '#FFF',
    fontFamily: 'Exo-Medium',
    fontSize: 16,
  },
  list: {
    backgroundColor: 'rgba(237, 240, 241, 0.1)',
    borderTopColor: '$primaryColor',
    alignSelf: 'center',
    width: WIDTH / 1.2,
  },
  listItem: {
    height: 80,
    justifyContent: 'center',
    borderBottomColor: '$primaryColor'
  },
  listItemTitle: {
    fontFamily: 'Exo-Medium',
    color: '$primaryColor',
  },
  listItemProgramsTitle: {
    fontFamily: 'Exo-Medium',
    color: '$tertiaryColor',
    alignSelf: 'center',
    marginLeft: -10,
    fontSize: 18
  },
  listItemProgramsSubtitle: {
    color: '$secondaryColor',
    alignSelf: 'center',
    fontFamily: 'exo',
    fontSize: 14,
  },
  listItemIcon: {
    color: '$tertiaryColor',
    alignSelf: 'center',
    paddingLeft: 10
  },
  avatar: {
    marginTop: 20,
    alignSelf: 'center',
  },
  programIcon: {
    backgroundColor: '$tertiaryColor',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  programDay: {
    fontFamily: 'Exo-Bold',
    fontSize: 25,
    color: '$primaryColor'
  },
  popup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH * 0.8,
  },
  popupTitle: {
    color: '$primaryColor',
    fontFamily: 'Exo-Medium',
    fontSize: 20,
  },
  popupDropdown: {
    backgroundColor: '$tertiaryColor',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: WIDTH * 0.7,
    borderRadius: 5,
    height: 30,
  },
  popupDropdownText: {
    backgroundColor: 'transparent',
    fontFamily: 'Exo-Medium',
    color: '$primaryColor',
    width: WIDTH * 0.7,
    marginLeft: 5,
    fontSize: 14,
    borderWidth: 0,
  },
  popupLabel: {
    backgroundColor: '$tertiaryColor',
    fontFamily: 'Exo-Medium',
    color: '$primaryColor',
    fontSize: 16,
    width: 200,
  },
  popupInputContainer: {
    alignSelf: 'center',
    width: WIDTH * 0.7,
    marginBottom: 5,
    borderRadius: 5,
  },
  popupInput: {
    color: '$primaryColor',
    fontFamily: 'Exo-Regular',
    fontSize: 16,
  },
  popupButtonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
});

export default themeStyles;
