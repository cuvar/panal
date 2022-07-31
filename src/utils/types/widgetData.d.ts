declare interface IWidgetPositionData {
  rowSpan: number;
  colSpan: number;
  rowStart: number;
  colStart: number;
}

declare type TType = 'datetime' | 'link' | 'gcalendar';

// declare type IWidgets = IDateTimeWidgetConfig | ILinkWidgetConfig;
declare type IWidgetConfig = { type: TType };
declare interface IWidgetData {
  sm: IWidgetPositionData;
  md: IWidgetPositionData;
  lg: IWidgetPositionData;
  config: IWidgetConfig;
}
