import type { CalendarWidgetData } from "~/server/widgets/calendar/types";

export default function CalendarWidget(props: CalendarWidgetData) {
  console.log(props);
  return (
    <div className="h-full w-full">
      <div className="h-full w-full overflow-y-scroll rounded-md bg-white p-2">
        {props.entries.map((entry, index) => (
          <div key={index} className="mb-4">
            <p className="text-sm leading-none text-black">
              {new Date(entry[0]?.start ?? "").toDateString()}
            </p>
            {entry.map((e, index) => (
              <div
                key={index}
                className="my-2 flex flex-col rounded-md bg-gray-800 p-2 text-xs"
              >
                <div>{e.title}</div>
                <div className="flex space-x-2">
                  <div>{formatDate(e.start)}</div>
                  <span>-</span>
                  <div>{formatDate(e.end)}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* <div>Calendar with {props.calendarData.length} entries</div> */}
    </div>
  );
}

function dateIsValid(date: Date) {
  return !Number.isNaN(new Date(date).getTime());
}

function formatDate(date: Date): string {
  if (!dateIsValid(date)) return "-";

  return Intl.DateTimeFormat("de-DE", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
}
