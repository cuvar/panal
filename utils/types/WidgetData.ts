import React from 'react';

declare interface IWidgetPositionData {
  rowSpan: number;
  colSpan: number;
  rowStart: number;
  colStart: number;
}

declare type TType = 'datetime' | 'gcalendar';

declare type IWidgetConfig = { type: TType } & IWidgetPositionData;
declare interface IWidgetData {
  sm: IWidgetPositionData;
  md: IWidgetPositionData;
  lg: IWidgetPositionData;
  config: IWidgetConfig;
}

// widget config types

declare interface IDateTimeWidgetConfig extends IWidgetConfig {
  time?: boolean;
  date?: boolean;
  mode?: '12' | '24';
}

export type { IWidgetData, IWidgetPositionData, IWidgetConfig, TType, IDateTimeWidgetConfig };
