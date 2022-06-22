import React from 'react';

declare interface IWidgetPositionData {
  rowSpan: number;
  colSpan: number;
  rowStart: number;
  colStart: number;
}

declare type TType = 'datetime' | 'gcalendar';
declare interface IWidgetConfig {
  type: TType;
}
declare interface IWidgetData {
  sm: IWidgetPositionData;
  md: IWidgetPositionData;
  lg: IWidgetPositionData;
  config: IWidgetConfig;
  children: React.ReactNode;
}

// widget config types

declare interface IDateTimeWidgetConfig extends IWidgetConfig {
  time?: boolean;
  date?: boolean;
}

export type { IWidgetData, IWidgetPositionData, IWidgetConfig, TType, IDateTimeWidgetConfig };
