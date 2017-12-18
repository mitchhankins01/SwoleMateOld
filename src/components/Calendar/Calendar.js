import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CalendarList } from 'react-native-calendars';

import themeStyles from './styles';

@inject('themeStore', 'logStore') @observer
class Calendar extends Component {
  render() {
    const { markedDate, updateMarkedDate, updateSelectedDate, toggleCalendar } = this.props.logStore;
    const styles = themeStyles[this.props.themeStore.selected];

    return (
      <CalendarList
        markedDates={markedDate}
        onDayPress={({ dateString }) => {
          toggleCalendar();
          updateSelectedDate(dateString);
          updateMarkedDate({ [dateString]: { selected: true } });
        }}
        theme={{
          textDayFontSize: 16,
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
        }}
      />
    );
  }
}

export default Calendar;
