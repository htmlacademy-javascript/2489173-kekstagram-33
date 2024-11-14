const MINUTES_IN_ONE_HOUR_TIME = 60;
const checkWorkingHours = (startOfTheworkingDay,endOfTheWorkingDay,startTimeOfTheMeeting,
  durationOfTheMeeting) => {
  const startOfTheworkingDayMinutes = Number(startOfTheworkingDay.split(':')[0]) * MINUTES_IN_ONE_HOUR_TIME + Number(startOfTheworkingDay.split(':')[1]) ;

  const endOfTheWorkingDayMinutes = Number(endOfTheWorkingDay.split(':')[0]) * MINUTES_IN_ONE_HOUR_TIME + Number(endOfTheWorkingDay.split(':')[1]) ;


  const startTimeOfTheMeetingMinutes = Number(startTimeOfTheMeeting.split(':')[0]) * MINUTES_IN_ONE_HOUR_TIME + Number(startTimeOfTheMeeting.split(':')[1]) ;

  if(startOfTheworkingDayMinutes > startTimeOfTheMeetingMinutes) {
    return 'Встреча не может быть назначена раньше начало рабочего дня';
  }

  if(endOfTheWorkingDayMinutes < startTimeOfTheMeetingMinutes + durationOfTheMeeting) {
    return false;
  }return true;

  // return  endOfTheWorkingDayMinutes < startTimeOfTheMeetingMinutes + durationOfTheMeeting;

};
checkWorkingHours('8:0', '10:0', '8:0', 120);

// имяФункции('08:00', '17:30', '14:00', 90); // true
// имяФункции('8:0', '10:0', '8:0', 120);     // true
// имяФункции('08:00', '14:30', '14:00', 90); // false
// имяФункции('14:00', '17:30', '08:0', 90);  // false
// имяФункции('8:00', '17:30', '08:00', 900); // false
