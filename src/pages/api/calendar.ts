import { NextApiRequest, NextApiResponse } from "next";
import ical from "ical";
import type { FullCalendar } from "ical";

const DAYS = 7;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const linkParam = JSON.parse(req.body).link;
  const daysInAdvanceParam = JSON.parse(req.body).daysInAdvance;

  const daysInAdvance = parseInt(daysInAdvanceParam) ?? DAYS;
  const link = linkParam ?? "";

  if (link == "" || typeof link !== "string") {
    res.status(400).json({ error: "No link provided" });
    return;
  }

  if (daysInAdvance < 1) {
    res.status(400).json({ error: "Days in advance must be at least 1" });
    return;
  }

  try {
    const calendarData = await getCalendar(link, daysInAdvance);

    calendarData.sort((a, b) => {
      return a.start.getTime() - new Date(b.start).getTime();
    });

    let todayPlusNDays = new Date();
    todayPlusNDays.setDate(new Date().getDate() + DAYS);

    // filter only next `DAYS` days

    const futureDates = calendarData.filter((item) => {
      const thisDate = new Date().toISOString().split("T")[0];
      const now = new Date().getTime();
      return (
        (item.start.getTime() >= now &&
          item.start.getTime() < todayPlusNDays.getTime()) || // following events
        (item.start.getTime() <= now && item.end.getTime() >= now) // currently running event
      );
    });

    const groupedData = groupCalendarDataByDay(futureDates);

    res.status(200).send({ calendarData: groupedData });
    return;
  } catch (error) {
    console.log(error);
  }

  res.status(500).send({ message: "Internal server error" });
  return;
}

async function getCalendar(
  link: string,
  daysInAdvance: number
): Promise<CalendarData[]> {
  const res = await fetch(link).then((res) => res.text());
  const data = ical.parseICS(res);
  const datesWithRecurrences = getDatesWithRecurrences(data, daysInAdvance);
  return datesWithRecurrences;
}

function getDatesWithRecurrences(
  data: FullCalendar,
  daysInAdvance: number
): CalendarData[] {
  let datesWithRecurrences: CalendarData[] = [];

  for (let k in data) {
    const rangeStart = new Date(); // today
    const todayPlusNDays = new Date().setDate(
      rangeStart.getDate() + daysInAdvance
    );
    const rangeEnd = new Date(todayPlusNDays);

    const event = data[k];

    if (typeof event === "undefined") continue;
    if (typeof event.start === "undefined") continue;
    if (typeof event.end === "undefined") continue;

    if (event.type !== "VEVENT") continue;

    const title = event.summary;
    let startDate = new Date(event.start);
    let endDate = new Date(event.end);

    let duration = endDate.getTime() - startDate.getTime();

    if (typeof event.rrule === "undefined") {
      const newEvent: CalendarData = {
        title: title ?? "*No data*",
        start: startDate,
        end: endDate,
        duration: duration,
      };
      datesWithRecurrences.push(newEvent);
      continue;
    }

    const dates = event.rrule.between(rangeStart, rangeEnd, true, () => true);

    // The "dates" array contains the set of dates within our desired date range range that are valid
    // for the recurrence rule.  *However*, it's possible for us to have a specific recurrence that
    // had its date changed from outside the range to inside the range.  One way to handle this is
    // to add *all* recurrence override entries into the set of dates that we check, and then later
    // filter out any recurrences that don't actually belong within our range.
    if (event.recurrences != undefined) {
      for (const r in event.recurrences) {
        // Only add dates that weren't already in the range we added from the rrule so that
        // we don't double-add those events.

        // check if date r is in range
        const date = new Date(r);
        if (date >= rangeStart && date <= rangeEnd) {
          dates.push(date);
        }
      }
    }

    for (let i in dates) {
      const date = dates[i]!;
      let curEvent = event;
      let showRecurrence = true;
      let curDuration = duration;

      startDate = date;
      const dateLookupKey = date.toISOString().substring(0, 10);

      // For each date that we're checking, it's possible that there is a recurrence override for that one day.
      if (
        curEvent.recurrences != undefined &&
        // @ts-ignore
        curEvent.recurrences[dateLookupKey] != undefined
      ) {
        // We found an override, so for this recurrence, use a potentially different title, start date, and duration.
        // @ts-ignore
        curEvent = curEvent.recurrences[dateLookupKey];
        if (typeof curEvent.start === "undefined") continue;
        if (typeof curEvent.end === "undefined") continue;

        startDate = new Date(curEvent.start);
        curDuration = new Date(curEvent.end).getTime() - startDate.getTime();
      }
      // If there's no recurrence override, check for an exception date. Exception dates represent exceptions to the rule.
      else if (
        curEvent.exdate != undefined &&
        curEvent.exdate[dateLookupKey] != undefined
      ) {
        // This date is an exception date, which means we should skip it in the recurrence pattern.
        showRecurrence = false;
      }

      const recurrenceTitle = curEvent.summary;
      endDate = new Date(startDate.getTime() + curDuration);

      if (endDate <= rangeStart || startDate >= rangeEnd) {
        showRecurrence = false;
      }

      if (showRecurrence === true) {
        const newEvent: CalendarData = {
          title: recurrenceTitle ?? "*No data*",
          start: startDate,
          end: endDate,
          duration: curDuration,
        };

        datesWithRecurrences.push(newEvent);
      }
    }
  }

  return datesWithRecurrences;
}

function groupCalendarDataByDay(data: CalendarData[]) {
  const grouped: CalendarData[][] = [];

  const days = new Set(
    data.map((item) => {
      return item.start.toDateString();
    })
  );

  days.forEach((day) => {
    const dayData = data.filter((item) => item.start.toDateString() === day);
    grouped.push(dayData);
  });

  return grouped;
}
