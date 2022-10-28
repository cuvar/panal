import { useState } from "react";

export default function TimeWidget() {
  const [formatedTime, setFormatedTime] = useState<string>("");

  setInterval(function () {
    setFormatedTime(
      Intl.DateTimeFormat("de-DE", {
        hour: "numeric",
        minute: "numeric",
      }).format(Date.now())
    );
  }, 1000);

  return (
    <div className="text-6xl flex justify-center items-center my-2">
      {formatedTime}
    </div>
  );
}
