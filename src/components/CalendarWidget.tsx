interface IProps {
  calendarData: CalendarData;
}

export default function CalendarWidget(props: IProps) {
  console.log("calendarData", props.calendarData);
  return (
    <div className="bg-green-800">
      <div>Calendar</div>
    </div>
  );
}
