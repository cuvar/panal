import type { WidgetProps } from "~/utils/types/widget";
import CalendarItem from "./CalendarItem";
import { type CalendarWidgetData } from "./types";

type Props = WidgetProps & {
  data: CalendarWidgetData;
};

export default function CalendarWidget(props: Props) {
  return (
    <div className="h-full w-full">
      <div className="h-full w-full overflow-y-scroll rounded-md bg-white p-2">
        {props.data.entries.map((entry, index) => (
          <div key={index} className="mb-4">
            <p className="text-sm leading-none text-black">
              {new Date(entry[0]?.start ?? "").toDateString()}
            </p>
            {entry.map((e, index) => (
              <CalendarItem key={index} entry={e} />
            ))}
          </div>
        ))}
        {props.data.entries.length === 0 && (
          <div className="flex h-full flex-col justify-center text-center text-gray-500">
            No calendar entries found
          </div>
        )}
      </div>
    </div>
  );
}
