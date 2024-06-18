import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

const CalendarScreen = ({ navigation }) => {
  const items = {
    '2024-06-01': [{ time: '10:00 - 10:30', title: 'Consulta Agendada', description: 'Descrição' }],
    '2024-06-04': [{ time: '11:00 - 11:30', title: 'Consulta Agendada', description: 'Descrição' }],
    '2024-06-06': [
      { time: '12:00 - 12:30', title: 'Consulta Agendada', description: 'Descrição' },
      { time: '15:00 - 15:30', title: 'Consulta Agendada', description: 'Descrição' },
    ],
  };

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const renderAppointments = () => {
    if (selectedAppointment) {
      return (
        <View style={styles.selectedAppointmentContainer}>
          <Text style={styles.selectedAppointmentTime}>{selectedAppointment.time}</Text>
          <Text style={styles.selectedAppointmentTitle}>{selectedAppointment.title}</Text>
          <Text style={styles.selectedAppointmentDescription}>{selectedAppointment.description}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Calendário</Text>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          current={'2024-06-01'}
          markedDates={{
            ...items,
            [selectedDate]: { selected: true, marked: true, selectedColor: '#2196F3' },
          }}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            const appointment = items[day.dateString];
            setSelectedAppointment(appointment && appointment[0] ? appointment[0] : null);
          }}
          monthFormat={'MMMM yyyy'}
          locale={'pt-br'}
          theme={{
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16,
            textDayFontFamily: 'Poppins_400Regular',
            textMonthFontFamily: 'Poppins_600SemiBold',
            textDayHeaderFontFamily: 'Poppins_600SemiBold',
            todayTextColor: '#2196F3',
            arrowColor: '#2196F3',
          }}
          renderDay={(day) => {
            const item = items[day.dateString];
            return (
              <View>
                <Text>{day.day}</Text>
                {item &&
                  item.map((appointment, index) => (
                    <View key={index}>
                      <Text style={styles.agendaItemTime}>{appointment.time}</Text>
                      <Text style={styles.agendaItemTitle}>{appointment.title}</Text>
                      <Text style={styles.agendaItemDescription}>{appointment.description}</Text>
                    </View>
                  ))}
              </View>
            );
          }}
        />
      </View>
      {renderAppointments()}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#1D1E1D',
    fontFamily: 'Poppins_600SemiBold',
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
  },
  calendarContainer: {
    width: '100%',
  },
  calendar: {
    width: '100%',
  },
  agendaItemTime: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 5,
  },
  agendaItemTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 5,
  },
  agendaItemDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  selectedAppointmentContainer: {
    backgroundColor: '#FFF',
    borderColor: 'rgba(128, 128, 128, 0)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginHorizontal: 20,
  },
  selectedAppointmentTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 5,
  },
  selectedAppointmentTime: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#2196F3',
    marginBottom: 5,
  },
  selectedAppointmentDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
}); 

export default CalendarScreen;
