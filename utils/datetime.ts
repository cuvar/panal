import { padNumber } from './string';
import { TDateMode, TTimeMode } from './types/WidgetData';

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

// todo: outsource types for DateTime from /utils/types/WidgetData.ts in separate file
// todo: fix issue with size of outer leftmost widget if only time is shown
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
