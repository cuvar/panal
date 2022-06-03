import { IWidgetConfig } from "../types/WidgetData";
import getWidgetData from "./read";

// % 4. (other file): get data for every widget
export default function loadDataForWidgets(): IWidgetConfig[] {
  const widgets: IWidgetConfig[] = getWidgetData();

  // todo: implement

  return widgets;
}
