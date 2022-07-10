import { padNumber } from './string';

function getHumanReadableDate(mode: TDateMode | null): string {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: string = padNumber(date.getMonth() + 1);
  const day: string = padNumber(date.getDate());

  if (mode === 'gb') {
    return `${day}/${month}/${year}`;
  }
  if (mode === 'us') {
    return `${month}/${day}/${year}`;
  }
  return `${day}.${month}.${year}`;
}

function getHumanReadableTime(mode: TTimeMode | null): string {
  const date: Date = new Date();
  let hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  if ((mode = '12')) {
    hours = hours % 12;
  }
  return `${padNumber(hours)}:${padNumber(minutes)}`;
}

export { getHumanReadableDate, getHumanReadableTime };
