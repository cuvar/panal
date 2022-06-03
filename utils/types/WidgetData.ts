declare interface IWidgetData {
  id: string;
  rowSpan: number;
  colSpan: number;
  rowStart: number;
  colStart: number;
  placeholder?: boolean;
}

declare interface IWidgetPositionData {
  rowSpan: number;
  colSpan: number;
  rowStart: number;
  colStart: number;
}
declare interface IWidgetConfig {
  id: string;
  sm: IWidgetPositionData;
  md: IWidgetPositionData;
  lg: IWidgetPositionData;
}

export { IWidgetData, IWidgetConfig, IWidgetPositionData };

//todo: current work: get widgetData from config file and work with it
