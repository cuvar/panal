type TDateMode = 'gb' | 'us' | 'de';
type TTimeMode = '12' | '24';
declare interface IDateTimeWidgetConfig extends IWidgetConfig {
  time?: boolean;
  date?: boolean;
  timemode?: TTimeMode;
  datemode?: TDateMode;
}
