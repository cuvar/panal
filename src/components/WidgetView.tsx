import styles from "./WidgetView.module.css";
import SearchWidget from "./SearchWidget";
import TimeWidget from "./TimeWidget";
import CalendarWidget from "./CalendarWidget";
import LinkCollectionWidget from "./LinkWidget/LinkCollectionWidget";
import WidgetContainer from "./WidgetContainer";

interface IProps {
  data: WidgetViewData;
}

function PlaceholderWidget() {
  return <div className="bg-yellow-500">Hello</div>;
}
export default function WidgetView(props: IProps) {
  return (
    <div
      className={`h-full grid ${styles["auto-rows"]} ${styles["sm-cols-3"]} ${styles["md-cols-6"]} ${styles["xl-cols-10"]} gap-4 sm:gap-6 `}
    >
      <WidgetContainer colspan={3} rowstart={1} minColSpan={2}>
        <TimeWidget />
      </WidgetContainer>
      <WidgetContainer colspan={3} rowstart={2} minColSpan={3}>
        <SearchWidget />
      </WidgetContainer>
      <WidgetContainer colspan={3} rowspan={2} minColSpan={2}>
        <CalendarWidget calendarData={props.data.calendarData} />
      </WidgetContainer>
      <WidgetContainer colspan={4} rowspan={1}>
        <LinkCollectionWidget colCount={4} rowCount={1} />
      </WidgetContainer>
      {/* <PlaceholderWidget /> */}
    </div>
  );
}
