import dayjs from 'dayjs'

export function generateDatesFromBeginningOfYear(){
  const firstDayOfTheYear = dayjs().startOf('year');
  const today = new Date();

  let dates = <Date[]>[];

  let comparableDate = firstDayOfTheYear;

  while (comparableDate.isBefore(today)){
    dates.push(comparableDate.toDate());
    comparableDate.add(1, 'day')
  }
}