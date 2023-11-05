import * as ics from "ics";
import AppError from "~/utils/error";
import type { Fetcher } from "./Fetcher";

export class MockICSFetcher implements Fetcher {
  number: number;
  constructor(number: number) {
    this.number = number;
  }

  async fetch(_url: string): Promise<string> {
    const events: ics.EventAttributes[] = [...createRandomEvents(this.number)];

    const res = ics.createEvents(events);
    if (res.error) {
      throw new AppError("cannot fetch for MockICSFetcher", res.error);
    }
    return Promise.resolve(res.value ?? "");
  }
}

/**
 * Generates an array random events
 * @param {number} n Amount of random events that should be generated
 * @returns {ics.EventAttributes[]} Generated events
 */
function createRandomEvents(n: number): ics.EventAttributes[] {
  const events = [];
  for (let i = 0; i < n; i++) {
    events.push(createRandomEvent("Test " + (i + 1)));
  }

  return events;
}

/**
 * Generates a random event which is scheduled in the future
 * @param {string} [title] Title of the event
 * @returns {ics.EventAttributes} Random event
 */
function createRandomEvent(title?: string): ics.EventAttributes {
  const date = getRandomDateInFuture();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  const event: ics.EventAttributes = {
    title: title ?? "Test",
    description: title ?? "Test",
    start: [year, month, day, hour, 0],
    duration: { hours: 1 },
  };

  return event;
}

/**
 * Generates a random date in the future
 * @returns {Date} Random date in the future
 */
function getRandomDateInFuture() {
  const date = new Date();
  date.setDate(date.getDate() + Math.random() * 100);
  return date;
}
