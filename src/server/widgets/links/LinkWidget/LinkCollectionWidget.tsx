import { useState } from "react";
import { useDetectScreenSize } from "~/utils/hooks";
import type { WidgetProps } from "~/utils/types/widget";
import type { LinkWidgetData } from "../types";
import LinkWidget from "./LinkWidget";

type Props = WidgetProps & {
  data: LinkWidgetData;
};

export default function LinkCollectionWidget(props: Props) {
  const [data] = useState<LinkWidgetData>(props.data);
  const currentScreenSize = useDetectScreenSize();

  const widgetWidth = props.widget.layout[currentScreenSize].w;
  const widgetHeight = props.widget.layout[currentScreenSize].h;

  return (
    <div className="flex h-full w-full flex-col space-y-2">
      <p className="text-md text-center text-slate-300">{data.title}</p>
      <div
        className={`grid w-full grid-cols-${widgetWidth} md:grid-cols-${widgetWidth} grid-rows-${widgetHeight} place-items-center`}
      >
        {data.links.slice(0, widgetWidth * widgetHeight).map((link, index) => (
          <div
            key={index}
            className="flex w-20 flex-col items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <LinkWidget text={link.text} href={link.href} tab={link.tab} />
          </div>
        ))}
      </div>
    </div>
  );
}
