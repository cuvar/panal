import { getHumanReadableDate, getHumanReadableTime } from '../../utils/datetime';
import { IDateTimeWidgetConfig, IWidgetConfig } from '../../utils/types/WidgetData';

interface IProps {
  widgetConfig: IWidgetConfig;
}

function DateTimeWidget(props: IProps) {
  return <div className='flex justify-center items-center text-center'>{getDateTimeContent(props.widgetConfig)}</div>;
}

export default DateTimeWidget;

function getDateTimeContent(config: IDateTimeWidgetConfig): string {
  let time: string = config.time ? getHumanReadableTime() : '';
  let date: string = config.date ? getHumanReadableDate() : '';

  const dateTime: string = time + date === '' ? `${getHumanReadableDate()}` : `${date}\n${time} `;

  return dateTime;
}
