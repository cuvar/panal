import { useState } from "react";
import type { TimeWidgetData } from "./types";

export default function TimeWidget(props: TimeWidgetData) {
  const [formatedTime, setFormatedTime] = useState<string>(
    Intl.DateTimeFormat("de-DE", {
      hour: "numeric",
      minute: "numeric",
    }).format(Date.now()),
  );

  setInterval(function () {
    setFormatedTime(
      Intl.DateTimeFormat("de-DE", {
        hour: "numeric",
        minute: "numeric",
      }).format(Date.now()),
    );
  }, 1000);

  return (
    <div className="flex items-center justify-center text-6xl">
      {formatedTime}
    </div>
  );
}
