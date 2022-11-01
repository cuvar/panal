interface IProps {
  calendarData: CalendarData[][];
}

export default function CalendarWidget(props: IProps) {
  return (
    <div className="mb-4">
      <div>Calendar with {props.calendarData.length} entries</div>
      <div className="h-60 overflow-y-scroll bg-white p-2 rounded-md">
        {props.calendarData.map((entry, index) => (
          <div key={index} className="mb-4">
            <p className="text-black text-sm leading-none">
              {new Date(entry[0]?.start ?? "").toDateString()}
            </p>
            {entry.map((e, index) => (
              <div
                key={index}
                className="flex flex-col bg-gray-800 rounded-md p-2 my-2 text-xs"
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
