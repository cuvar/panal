import { useState } from "react";
import type { ScreenSizePositioning } from "~/utils/types/widget";
import type { TimeWidgetData } from "./types";

type Props = {
  data: TimeWidgetData;
  layout: ScreenSizePositioning;
};

export default function TimeWidget(_props: Props) {
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
