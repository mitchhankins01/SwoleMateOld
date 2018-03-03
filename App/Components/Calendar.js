import React from 'react';
import { View } from 'react-native';
import { Calendar as Cal } from 'react-native-calendars';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Constants } from '../Themes';

const styles = EStyleSheet.create( {
  $textColor: '$text',
  $primary: '$primaryColor',
  $tertiary: '$tertiaryColor',
  $secondary: '$secondaryColor',
  calendarContainer: {
    margin: 15,
    elevation: 1,
    marginTop: 30,
  },
} );

const Calendar = props => (
  // const {
  //   markedDate, updateSelectedDate, toggleCalendar, fetchLogs,
  // } = props.logStore;

  // const markedDateToJS = toJS( markedDate );
  <View style={ { flex: 1 } }>
    <Cal
      markingType="multi-dot"
      // markedDates={ markedDateToJS }
      onDayPress={ ( { dateString } ) => {
        // fetchLogs();
        // toggleCalendar();
        // updateSelectedDate( dateString );
      } }
      style={ styles.calendarContainer }
      theme={ {
        textDayFontSize: 16,
        textMonthFontSize: 18,
        // dotColor: '#00adf5',
        textDayHeaderFontSize: 12,
        arrowColor: styles.$textColor,
        // selectedDotColor: '#ffffff',
        dayTextColor: styles.$textColor,
        textMonthFontFamily: 'Exo-Bold',
        textDayFontFamily: 'Exo-Medium',
        todayTextColor: styles.$primary,
        monthTextColor: styles.$textColor,
        textDayHeaderFontFamily: 'Exo-Regular',
        selectedDayTextColor: styles.$textColor,
        textSectionTitleColor: styles.$textColor,
        selectedDayBackgroundColor: styles.$tertiary,
        backgroundColor: 'transparent', // 'rgba(237, 240, 241, 0.1)',
        calendarBackground: 'transparent', // 'rgba(237, 240, 241, 0.1)',
        'stylesheet.day.basic': {
          dot: {
            width: 10,
            height: 10,
            marginTop: 1,
            marginLeft: 1,
            marginRight: 1,
            borderRadius: 2,
            opacity: 0,
          },
        },
      } }
    />
  </View>
);
export default Calendar;
