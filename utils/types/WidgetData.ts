import React from "react";

declare interface IWidgetPositionData {
  rowSpan: number;
  colSpan: number;
  rowStart: number;
  colStart: number;
}
declare interface IWidgetData {
  id: string;
  sm: IWidgetPositionData;
  md: IWidgetPositionData;
  lg: IWidgetPositionData;
  children: React.ReactNode;
}

export type { IWidgetData, IWidgetPositionData };
