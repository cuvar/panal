import { getCurrentDateHumanReadable } from "../datetime";
import { IWidgetData } from "../types/WidgetData";
const singleMockWidgetData: IWidgetData[] = [
  {
    rowSpan: 1,
    colSpan: 1,
    rowStart: 1,
    colStart: 1,
    title: `${getCurrentDateHumanReadable()}`,
  },
];
const mockWidgetData: IWidgetData[] = [
  {
    rowStart: 1,
    colStart: 1,
    rowSpan: 1,
    colSpan: 2,
    title: `${getCurrentDateHumanReadable()}`,
  },
  {
    rowStart: 2,
    colStart: 1,
    rowSpan: 1,
    colSpan: 1,
    title: `${getCurrentDateHumanReadable()}`,
  },
  {
    rowStart: 3,
    colStart: 1,
    rowSpan: 1,
    colSpan: 1,
    title: `${getCurrentDateHumanReadable()}`,
  },
  {
    rowStart: 2,
    colStart: 2,
    rowSpan: 1,
    colSpan: 1,
    title: `${getCurrentDateHumanReadable()}`,
  },
  {
    rowStart: 1,
    colStart: 3,
    rowSpan: 2,
    colSpan: 3,
    title: `${getCurrentDateHumanReadable()}`,
  },
  {
    rowStart: 3,
    colStart: 3,
    rowSpan: 3,
    colSpan: 2,
    title: `${getCurrentDateHumanReadable()}`,
  },
  {
    rowStart: 1,
    colStart: 6,
    rowSpan: 3,
    colSpan: 3,
    title: `${getCurrentDateHumanReadable()}`,
  },
  {
    rowStart: 4,
    colStart: 6,
    rowSpan: 2,
    colSpan: 2,
    title: `${getCurrentDateHumanReadable()}`,
  },
];
export { mockWidgetData, singleMockWidgetData };
