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
  children: any;
}

export { IWidgetData, IWidgetPositionData };
