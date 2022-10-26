import SearchWidget from "./SearchWidget";
import TimeWidget from "./TimeWidget";
import CalendarWidget from "./CalendarWidget";
import LinkCollectionWidget from "./LinkWidget/LinkCollectionWidget";

interface IProps {
  data: WidgetViewData;
}

export default function WidgetView(props: IProps) {
  return (
    <>
      <TimeWidget />
      <SearchWidget />
      <LinkCollectionWidget />
      <CalendarWidget calendarData={props.data.calendarData} />
    </>
  );
}
