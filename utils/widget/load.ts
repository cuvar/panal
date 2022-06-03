import { IWidgetData } from "../types/WidgetData";
import widgetConfig from "../../widgets.config";

// % 4. (other file): get data for every widget
export default function loadDataForWidgets(): IWidgetData[] {
  const widgets: Omit<IWidgetData, "children">[] = widgetConfig;
  const newWidgets: IWidgetData[] = [];

  widgets.forEach((widget) => {
    newWidgets.push({ ...widget, children: getDataForId(widget.id) });
  });

  return newWidgets;
}

function getDataForId(id: string): string {
  // todo: implement
  return "Hello world";
}
