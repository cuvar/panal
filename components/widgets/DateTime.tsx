import { getHumanReadableDate, getHumanReadableTime } from '../../utils/datetime';

interface IProps {
  widgetConfig: IWidgetConfig;
}

function DateTimeWidget(props: IProps) {
  return <div className='flex justify-center items-center text-center'>{getDateTimeContent(props.widgetConfig)}</div>;
}

export default DateTimeWidget;

function getDateTimeContent(config: IDateTimeWidgetConfig): string {
  let time: string = config.time ? getHumanReadableTime(config.timemode ?? null) : '';
  let date: string = config.date ? getHumanReadableDate(config.datemode ?? null) : '';

  const dateTime: string = time + date === '' ? `${getHumanReadableDate(config.datemode ?? null)}` : `${date}\n${time} `;

  return dateTime;
}
