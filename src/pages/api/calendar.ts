import { NextApiRequest, NextApiResponse } from "next";
import ical from "ical";

// const LINK =
//   "https://calendar.google.com/calendar/ical/luca-mueller%40gmx.net/public/basic.ics";
const LINK =
  "https://rapla.dhbw-karlsruhe.de/rapla?page=ical&user=braun&file=TINF20B2";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getCalendar();
    const futureDates = data.filter(
      (item) => new Date(item.start) > new Date()
    );
    const groupedData = groupCalendarDataByDay(futureDates);
    groupedData.sort((a, b) => {
      return new Date(a[0]!.start).getTime() - new Date(b[0]!.start).getTime();
    });

    res.status(200).send({ calendarData: groupedData });
    return;
  } catch (error) {
    console.log(error);
  }

  res.status(500).send({ message: "Internal server error" });
  return;
}

async function getCalendar(): Promise<CalendarData[]> {
  const res = await fetch(LINK).then((res) => res.text());
  const data = ical.parseICS(res);
  const dataArr = Object.values(data);

  const eventArray = dataArr.map((item) => {
    return {
      title: item.summary,
      start: item.start?.toString(),
      end: item.end?.toString(),
    } as CalendarData;
  });

  return eventArray;
}

function groupCalendarDataByDay(data: CalendarData[]) {
  const grouped: CalendarData[][] = [];

  const days = new Set(
    data.map((item) => {
      return new Date(item.start).toDateString();
    })
  );

  days.forEach((day) => {
    const dayData = data.filter(
      (item) => new Date(item.start).toDateString() === day
    );
    grouped.push(dayData);
  });

  return grouped;
}
