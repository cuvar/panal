import { useEffect, useRef } from "react";
import { type CalendarEntry } from "./types";

type Props = {
  color: string;
  entry: CalendarEntry;
};

export default function CalendarItem(props: Props) {
  const containerRef = useRef(null);
  const defaultColor = "1f2937"; // = bg-gray-800

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    (containerRef.current as HTMLDivElement).style.backgroundColor =
      props.color ?? defaultColor;
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-2 flex flex-col rounded-md p-2 text-xs"
    >
      <div>{props.entry.title}</div>
      <div className="flex space-x-2">
        <div>{formatDate(props.entry.start)}</div>
        <span>-</span>
        <div>{formatDate(props.entry.end)}</div>
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
