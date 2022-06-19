import WidgetContainer from "../WidgetContainer";
import type { IWidgetData } from "../../utils/types/WidgetData";
import { getGridColConfig } from "../../utils/config/load";

interface IProps {
  widgetData: IWidgetData[];
}

function WidgetView(props: IProps) {
  const gridRowClass: string =
    "grid-rows-auto-4 sm:grid-rows-auto-4 md:grid-rows-auto-6 lg:grid-rows-auto-8";
  const defaultColAmount = getGridColConfig();

  const xsClass = `grid-cols-${defaultColAmount.xs}`;
  const smClass = `sm:grid-cols-${defaultColAmount.sm}`;
  const mdClass = `md:grid-cols-${defaultColAmount.md}`;
  const lgClass = `lg:grid-cols-${defaultColAmount.lg}`;
  const xlClass = `xl:grid-cols-${defaultColAmount.xl}`;

  const gridColClass: string = `${xsClass} ${smClass} ${mdClass} ${lgClass} ${xlClass}`;

  return (
    <div
      className={
        "h-full max-w-screen-2xl grid gap-x-4 sm:gap-x-8 gap-y-4 sm:gap-y-8" +
        " " +
        gridRowClass +
        " " +
        gridColClass
      }
    >
      {props.widgetData.map((widget, index) => {
        return (
          <WidgetContainer
            key={index}
            rowSpan={widget.lg.rowSpan}
            colSpan={widget.lg.colSpan}
            rowStart={widget.lg.rowStart}
            colStart={widget.lg.colStart}
          >
            {" "}
            {widget.children}
          </WidgetContainer>
        );
      })}
    </div>
  );
}

export default WidgetView;
