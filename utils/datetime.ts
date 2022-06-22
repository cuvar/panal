import { padNumber } from './string';

function getHumanReadableDate(): string {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: string = padNumber(date.getMonth() + 1);
  const day: string = padNumber(date.getDate());
  return `${day}.${month}.${year}`;
}

function getHumanReadableTime(): string {
  const date: Date = new Date();
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  return `${padNumber(hours)}:${padNumber(minutes)}`;
}

export { getHumanReadableDate, getHumanReadableTime };
