import { useEffect, useRef } from "react";
import { type CalendarEntry } from "./types";

type Props = {
  entry: CalendarEntry;
};

export default function CalendarItem(props: Props) {
  const containerRef = useRef(null);
  const defaultColor = "#1f2937"; // = bg-gray-800

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    (containerRef.current as HTMLDivElement).style.backgroundColor =
      props.entry.color ?? defaultColor;
  }, [props.entry.color]);

  const formatedStart = formatDate(props.entry.start);
  const formatedEnd = formatDate(props.entry.end);
  return (
    <div
      ref={containerRef}
      className="my-2 flex flex-col rounded-md p-2 text-xs"
    >
      <div className="font-bold">{props.entry.title}</div>
      <div className="flex space-x-2">
        {formatedStart == formatedEnd && isWholeDay(props.entry.duration) ? (
          <div className="">full-day</div>
        ) : (
          <div className="">
            {formatedStart}-{formatedEnd}
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  if (!dateIsValid(date)) return "-";

  return Intl.DateTimeFormat("de-DE", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
}

function dateIsValid(date: Date) {
  return !Number.isNaN(new Date(date).getTime());
}

function isWholeDay(duration: number) {
  return duration == 24 * 60 * 60 * 1000;
}
