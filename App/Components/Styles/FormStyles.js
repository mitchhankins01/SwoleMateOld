import t from 'tcomb-form-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Fonts, Constants } from '../../Themes/';

t.form.Form.stylesheet.textbox.error.color = '#EDF0F1';
t.form.Form.stylesheet.textbox.normal.color = '#EDF0F1';
t.form.Form.stylesheet.pickerValue.error.color = '#EDF0F1';
t.form.Form.stylesheet.pickerValue.normal.color = '#EDF0F1';
t.form.Form.stylesheet.controlLabel.normal.color = '#EDF0F1';
t.form.Form.stylesheet.textbox.normal.borderColor = '#EDF0F1';
t.form.Form.stylesheet.textbox.error.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.textbox.normal.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.pickerValue.error.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.pickerValue.normal.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.controlLabel.error.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.controlLabel.normal.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.pickerContainer.error.backgroundColor = 'transparent';
t.form.Form.stylesheet.pickerContainer.normal.backgroundColor = 'transparent';

t.form.Form.stylesheet.select.normal.color = '#EDF0F1';
t.form.Form.stylesheet.select.normal.fontFamily = Fonts.type.regular;
t.form.Form.stylesheet.select.error.fontFamily = Fonts.type.regular;

export default EStyleSheet.create({
  $primary: '$primaryColor',
  formStyle: { flex: 1, padding: 30 },
  button: {
    width: 50,
    margin: 15,
    height: 50,
    elevation: 3,
    borderWidth: 2,
    shadowRadius: 2,
    borderRadius: 15,
    shadowOpacity: 0.8,
    alignSelf: 'center',
    borderColor: '$primaryColor',
    shadowColor: '$primaryColor',
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    fontSize: 30,
    color: '$primaryColor',
  },
  selectButton: {
    color: '$text',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonText: {
    color: '$text',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.medium,
  },
  dropdown: {
    alignSelf: 'center',
    width: Constants.DEV_WIDTH * 0.8,
    backgroundColor: '$tertiaryColor',
  },
  dropdownStyle: {
    height: 400,
    width: Constants.DEV_WIDTH * 0.8,
    backgroundColor: '$tertiaryColor',
  },
  dropdownText: {
    padding: 15,
    color: '$text',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular,
    backgroundColor: 'transparent',
    width: Constants.DEV_WIDTH * 0.8,
  },
  dropdownItemText: {
    color: '$text',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.medium,
    backgroundColor: 'transparent',
    width: Constants.DEV_WIDTH * 0.8,
  },
  exerciseText: {
    padding: 15,
    color: '$text',
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
  },
});
