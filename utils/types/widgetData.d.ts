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
