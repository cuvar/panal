import { NextApiRequest, NextApiResponse } from "next";

const LINK =
  "https://calendar.google.com/calendar/ical/luca-mueller%40gmx.net/public/basic.ics";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // await getCalendar();
  res.status(200).send({ message: "success" });
  return;
}

// function getCalendar() {
// 	fetch(LINK)
// 		.then((response) => response.text())
// 		.then((data) => {
// 			const parser = new DOMParser();
// 			const doc = parser.parseFromString(data, 'text/xml');
// 			const events = doc.querySelectorAll('event');
// 			const eventList: any[] = [];
// 			events.forEach((event) => {
// 				const eventObject = {
// 					title: event.querySelector('summary').textContent,
// 					start: event.querySelector('dtstart').textContent,
// 					end: event.querySelector('dtend').textContent,
// 					location: event.querySelector('location').textContent,
// 					description: event.querySelector('description').textContent
// 				};
// 				eventList.push(eventObject);
// 			});
// 			console.log(eventList);
// 		});
// }

// (async () => {
// 	await getCalendarGoogle();
// })();

// async function getCalendarGoogle() {
// 	const response = await fetch(link);
// 	const text = await response.text();
// 	console.log(text);
// }
