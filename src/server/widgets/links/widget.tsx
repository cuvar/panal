import { useDetectScreenSize } from "~/lib/ui/hooks";
import type { WidgetProps } from "~/utils/types/widget";
import LinkItem from "./LinkItem";
import type { LinkWidgetData } from "./types";

type Props = WidgetProps & {
  data: LinkWidgetData;
};

export default function LinkCollectionWidget(props: Props) {
  const currentScreenSize = useDetectScreenSize();

  const widgetWidth = props.widget.layout[currentScreenSize].w + 1;
  const widgetHeight = props.widget.layout[currentScreenSize].h;

  return (
    <div className="flex h-full w-full flex-col space-y-2">
      <p className="text-md text-center text-foreground">{props.data.title}</p>
      <div
        className={`grid w-full grid-cols-${widgetWidth} md:grid-cols-${widgetWidth} grid-rows-${widgetHeight} place-items-center`}
      >
        {props.data.links
          .slice(0, widgetWidth * widgetHeight)
          .map((link, index) => (
            <div
              key={index}
              className="flex w-20 flex-col items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <LinkItem text={link.text} href={link.href} tab={link.tab} />
            </div>
          ))}
      </div>
    </div>
  );
}
