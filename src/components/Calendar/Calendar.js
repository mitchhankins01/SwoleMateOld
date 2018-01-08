import React from 'react';
import { toJS } from 'mobx';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Calendar as Cal } from 'react-native-calendars';

import themeStyles from './styles';

export default inject('userStore', 'logStore')(observer((props) => {
  const {
    markedDate, updateSelectedDate, toggleCalendar, fetchLogs
  } = props.logStore;
  const styles = themeStyles[props.userStore.selected];

  const markedDateToJS = toJS(markedDate);
  return (
    <View style={{ flex: 1 }}>
      <Cal
        markingType={'multi-dot'}
        markedDates={markedDateToJS}
        onDayPress={({ dateString }) => {
          fetchLogs();
          toggleCalendar();
          updateSelectedDate(dateString);
        }}
        style={styles.calendarContainer}
        theme={{
          textDayFontSize: 16,
          arrowColor: '#EDF0F1',
          textMonthFontSize: 18,
          // dotColor: '#00adf5',
          dayTextColor: '#EDF0F1',
          textDayHeaderFontSize: 12,
          monthTextColor: '#EDF0F1',
          // selectedDotColor: '#ffffff',
          selectedDayTextColor: '#EDF0F1',
          textMonthFontFamily: 'Exo-Bold',
          textDayFontFamily: 'Exo-Medium',
          textSectionTitleColor: '#EDF0F1',
          todayTextColor: styles.$primaryColor,
          textDayHeaderFontFamily: 'Exo-Regular',
          backgroundColor: 'transparent', // 'rgba(237, 240, 241, 0.1)',
          calendarBackground: 'transparent', // 'rgba(237, 240, 241, 0.1)',
          selectedDayBackgroundColor: styles.$tertiaryColor,
          'stylesheet.day.basic': {
            dot: {
              width: 10,
              height: 10,
              marginTop: 1,
              marginLeft: 1,
              marginRight: 1,
              borderRadius: 2,
              opacity: 0
            },
          }
        }}
      />
    </View>
  );
}));
