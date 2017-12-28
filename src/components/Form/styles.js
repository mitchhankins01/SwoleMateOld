import t from 'tcomb-form-native';
import { Dimensions } from 'react-native';

import themes from '../theme';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

t.form.Form.stylesheet.textbox.error.color = '#EDF0F1';
t.form.Form.stylesheet.textbox.normal.color = '#EDF0F1';
t.form.Form.stylesheet.pickerValue.error.color = '#EDF0F1';
t.form.Form.stylesheet.pickerValue.normal.color = '#EDF0F1';
t.form.Form.stylesheet.controlLabel.normal.color = '#EDF0F1';
t.form.Form.stylesheet.textbox.normal.borderColor = '#EDF0F1';
t.form.Form.stylesheet.textbox.error.fontFamily = 'Exo-Regular';
t.form.Form.stylesheet.textbox.normal.fontFamily = 'Exo-Regular';
t.form.Form.stylesheet.pickerValue.error.fontFamily = 'Exo-Regular';
t.form.Form.stylesheet.pickerValue.normal.fontFamily = 'Exo-Regular';
t.form.Form.stylesheet.controlLabel.error.fontFamily = 'Exo-Regular';
t.form.Form.stylesheet.controlLabel.normal.fontFamily = 'Exo-Regular';
t.form.Form.stylesheet.pickerContainer.error.backgroundColor = 'transparent';
t.form.Form.stylesheet.pickerContainer.normal.backgroundColor = 'transparent';

t.form.Form.stylesheet.select.normal.color = '#EDF0F1';
t.form.Form.stylesheet.select.normal.fontFamily = 'Exo-Regular';
t.form.Form.stylesheet.select.error.fontFamily = 'Exo-Regular';

const themeStyles = themes.createStyleSheet({
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
  dropdownContainer: {
    height: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    width: DEVICE_WIDTH * 0.6,
    backgroundColor: 'transparent',
  },
  dropdownContainerText: {
    fontSize: 14,
    color: '#EDF0F1',
    paddingVertical: 10,
    paddingHorizontal: 50,
    fontFamily: 'Exo-Medium',
    backgroundColor: 'transparent',
  },
  dropdownList: {
    backgroundColor: '$secondaryColor',
  },
  cardDivider: {
    borderWidth: 0.5,
    marginVertical: 15,
    borderColor: '$primaryColor',
  },
});

export default themeStyles;
